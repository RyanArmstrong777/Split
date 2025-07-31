import { definitions } from '@/constants/definitions';
import { spacing } from '@/constants/spacing';
import { textSizes, textWeights } from '@/constants/text';
import { CompletedExercise, CompletedWorkout, Theme, Workout } from '@/constants/types';
import { useAppSettingsContext } from '@/contexts/appSettingsContext';
import { createCompletedExercise } from '@/db/queries/completed_exercises/createCompletedExercise';
import { getActiveCompletedExercisesForDate } from '@/db/queries/completed_exercises/getActiveCompletedExercisesForDate';
import { SQLiteDatabase } from 'expo-sqlite';
import { Check, ChevronLeft, ChevronRight, Pencil, Plus } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, Text, View } from 'react-native';
import AdBanner from '../ads/adBanner';
import RecordButton from '../buttons/recordButton';
import SubmitButton from '../buttons/submitButton';
import DefaultInput from '../inputs/defaultInput';

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

const { width, height } = Dimensions.get("window")

const ExercisesChecklist = ({theme, db, selectedWorkout, goToPage, splitId, refreshExercises, setRefreshExercises, setSelectedExercise, selectedDate}: ExercisesChecklistProps) => {

    const { settings } = useAppSettingsContext()
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
        const timeout = setTimeout(() => {
            setNewExerciseName("")
            setNewRestInterval("")
        }, 500)

        return () => clearTimeout(timeout)
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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <RecordButton theme={theme} style={{justifyContent: "center", flexShrink: 1}}>
                        <AdBanner style={{marginVertical: spacing.md}} id={"ca-app-pub-9362350160554339/8051360690"}/>
                    </RecordButton>
                    {exercises.map((exercise, index) => (
                        <RecordButton
                            key={index}
                            onPress={() => handleSelectExercise(exercise)}
                            theme={theme}
                            style={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}
                        >
                            <Text style={{ fontSize: textSizes.sm, color: theme.text, marginRight: "auto", flexShrink: 1 }} ellipsizeMode='tail' numberOfLines={1}>
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
            <View style={styles.exercisesContainer}>
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
                <ScrollView style={{flex: 0}} showsVerticalScrollIndicator={false}>
                    <RecordButton theme={theme} style={{flexDirection: "row", paddingVertical: spacing.md, borderBottomWidth: 0}}>
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
                </ScrollView>
                
                <View style={{ marginTop: "auto", marginBottom: spacing.lg, paddingHorizontal: 1 }}>
                    <SubmitButton theme={theme} text={"Create exercise"} onPress={() => handleCreateCompletedExercise()} />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = {
  exercisesContainer: {
    width,
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
};

export default ExercisesChecklist;