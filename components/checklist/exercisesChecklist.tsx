import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, View, Dimensions, Pressable } from 'react-native';
import { Check, ChevronRight, ChevronLeft, Plus, Pencil } from 'lucide-react-native';
import RecordButton from '../buttons/recordButton';
import { textSizes, textWeights } from '@/constants/text';
import { spacing } from '@/constants/spacing';
import { CompletedExercise, Theme } from '@/constants/types';
import { getActiveCompletedExercisesForDate } from '@/db/queries/completed_exercises/getActiveCompletedExercisesForDate';
import { SQLiteDatabase } from 'expo-sqlite';
import DefaultInput from '../inputs/defaultInput';
import { definitions } from '@/constants/definitions';
import SubmitButton from '../buttons/submitButton';
import { createCompletedExercise } from '@/db/queries/completed_exercises/createCompletedExercise';
import { CompletedWorkout, Workout } from '@/constants/types';

type ExercisesChecklistProps = {
  theme: Theme
  db: SQLiteDatabase
  selectedWorkout: (CompletedWorkout & Workout) | null
  goToPage: (page: number) => void
  refreshExercises: boolean
  splitId: number | null
  setRefreshExercises: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedExercise: (exercise: CompletedExercise) => void;
  selectedDate: string
};

const { width } = Dimensions.get("window")

const ExercisesChecklist = ({
  theme,
  db,
  selectedWorkout,
  goToPage,
  splitId,
  refreshExercises,
  setRefreshExercises,
  setSelectedExercise,
  selectedDate
}: ExercisesChecklistProps) => {

  const [exercises, setExercises] = useState([] as CompletedExercise[])
  const [newExerciseName, setNewExerciseName] = useState("")
  const [newRestInterval, setNewRestInterval] = useState("")

  const scrollRef = useRef<ScrollView>(null)

  function viewAddExercise(value: boolean) {
    scrollRef.current?.scrollTo({ x: value ? width : 0, animated: true })
  }

  useEffect(() => {
    async function getExercises() {
      if (splitId) {
        setExercises(await getActiveCompletedExercisesForDate(db, selectedDate, splitId))
      }
    }
    getExercises()
    viewAddExercise(false)
  }, [selectedDate, refreshExercises, selectedWorkout])

  function resetInputs() {
    setTimeout(() => {
      setNewExerciseName("")
      setNewRestInterval("")
    }, 500)
  }

  function handleSelectExercise(exercise: CompletedExercise) {
    setSelectedExercise(exercise)
    goToPage(1)
  }

  async function handleCreateCompletedExercise() {
    if (selectedWorkout) {
      await createCompletedExercise(db, {name: newExerciseName, restInterval: parseInt(newRestInterval, 10), completedWorkoutId: selectedWorkout.id})
      setRefreshExercises(prev => !prev)
      resetInputs()
    }
  }

  return (
    <ScrollView style={{width}} horizontal pagingEnabled scrollEnabled={false} showsHorizontalScrollIndicator={false} ref={scrollRef}>
      <View style={styles.exercisesContainer}>
        <RecordButton theme={theme} style={{ gap: spacing.sm, paddingHorizontal: spacing.lg }}>
            <Text style={{ fontSize: textSizes.sm, fontWeight: textWeights.bold, color: theme.text, marginRight: "auto" }}>
                Exercises
            </Text>
            <Pressable onPress={() => viewAddExercise(true)} style={{paddingVertical: spacing.md}}>
              <Plus size={textSizes.md} color={theme.text} />
            </Pressable>
        </RecordButton>
        <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 40}} showsVerticalScrollIndicator={false}>
          {exercises.map((exercise, index) => (
            <RecordButton
              key={index}
              onPress={() => handleSelectExercise(exercise)}
              theme={theme}
              style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}
            >
              <Text style={{ fontSize: textSizes.sm, color: theme.text, marginRight: "auto" }}>
                {exercise.name}
              </Text>
              <Text style={{ fontSize: textSizes.sm, color: theme.text }}>
                {`${exercise.setsCompleted} / ${exercise.setsToBeCompleted}`}
              </Text>
              {exercise.setsCompleted === exercise.setsToBeCompleted ? (
                exercise.setsToBeCompleted === 0 ? (
                  <Pencil size={textSizes.md} color={theme.text} />
                ) : (
                  <Check size={textSizes.md} color={"green"} />
                )
              ) : (
                <ChevronRight size={textSizes.md} color={theme.text} />
              )}
            </RecordButton>
          ))}
        </ScrollView>
      </View>
      <View style={{paddingHorizontal: spacing.lg, width}}>
        <RecordButton
            theme={theme}
            style={{ gap: spacing.md, paddingHorizontal: spacing.lg }}
        >
          <Pressable onPress={() => { viewAddExercise(false); resetInputs() }} style={{paddingVertical: spacing.md}}>
            <ChevronLeft size={textSizes.md} color={theme.text} />
          </Pressable>
          <Text
              style={{
                  fontSize: textSizes.sm,
                  fontWeight: textWeights.bold,
                  color: theme.text,
              }}
          >
              Add exercise
          </Text>
        </RecordButton>
        <RecordButton theme={theme} style={{flexDirection: "row", paddingVertical: spacing.md}}>
            <DefaultInput
                theme={theme}
                value={newExerciseName}
                onChangeText={setNewExerciseName}
                placeholder={"Exercise name..."}
                style={{ paddingHorizontal: spacing.lg }}
            />
        </RecordButton>
        <RecordButton theme={theme} style={{flexDirection: "row", paddingHorizontal: spacing.lg, gap: spacing.md, paddingVertical: spacing.md}}>
            <Text style={{fontSize: textSizes.sm, fontWeight: textWeights.regular, color: theme.text}}>
                Rest interval (s)
            </Text>
            
            <DefaultInput
                theme={theme}
                value={newRestInterval}
                onChangeText={setNewRestInterval}
                placeholder={"e.g. 120"}
                keyboardType={"numeric"}
            />
        </RecordButton>
        <Text
            style={{
                fontSize: textSizes.xs,
                fontWeight: textWeights.light,
                color: theme.text,
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md
            }}
            
        >
            {definitions.newExercise}
        </Text>
        <View style={{ marginTop: "auto", marginBottom: spacing.lg, paddingHorizontal: 1 }}>
            <SubmitButton theme={theme} text={"Create exercise"} onPress={() => handleCreateCompletedExercise()} />
        </View>
    </View>
    </ScrollView>
  );
};

const styles = {
  exercisesContainer: {
    flex: 1,
    width,
    paddingHorizontal: spacing.lg,
  },
};

export default ExercisesChecklist;