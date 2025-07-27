import React, { useRef, useState, useEffect } from "react";
import { ScrollView, Text, Dimensions, View, Pressable, Vibration } from "react-native";
import { ChevronRight, Plus, ChevronLeft, Trash2, Copy, ClipboardPaste, Check } from "lucide-react-native";
import RecordButton from "../../buttons/recordButton";
import { textSizes, textWeights } from "@/constants/text";
import { spacing } from "@/constants/spacing";
import { Exercise, Workout } from "@/constants/types";
import DefaultInput from "@/components/inputs/defaultInput";
import SubmitButton from "@/components/buttons/submitButton";
import { createExercise } from "@/db/queries/exercises/createExercise";
import { definitions } from "@/constants/definitions";
import { deleteWorkout } from "@/db/queries/workouts/deleteWorkout";
import { getExercisesByWorkoutId } from "@/db/queries/exercises/getExercisesByWorkoutId";
import { pasteExercise } from "@/db/queries/exercises/pasteExercise";
import { updateWorkoutName } from "@/db/queries/workouts/updateWorkoutName";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";

type ExerciseSelectorProps = {
    theme: any
    db: any
    goToSection: (section: number) => void
    refreshWorkouts: boolean
    setRefreshWorkouts: React.Dispatch<React.SetStateAction<boolean>>
    refreshExercises: boolean
    setRefreshExercises: React.Dispatch<React.SetStateAction<boolean>>
    selectedWorkout: Workout
    setSelectedExercise: (exercise: Exercise) => void
};

const { width } = Dimensions.get("window");

const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({
    theme,
    db,
    goToSection,
    refreshWorkouts,
    setRefreshWorkouts,
    refreshExercises,
    setRefreshExercises,
    selectedWorkout,
    setSelectedExercise,
}) => {

    function handleSelectExercise(exercise: Exercise) {
        setSelectedExercise(exercise)
        goToSection(2)
    }

    const { settings } = useAppSettingsContext()

    const scrollRef = useRef<ScrollView>(null)
    const exercisesRef = useRef<ScrollView>(null)

    const [exercises, setExercises] = useState([] as Exercise[])

    const [clipboard, setClipboard] = useState<Exercise | null>(null)
    const [copiedExerciseId, setCopiedExerciseId] = useState<number | null>(null)
    const [isPasting, setIsPasting] = useState(false)

    const [workoutName, setWorkoutName] = useState("")

    async function updateWorkout() {
        await updateWorkoutName(db, selectedWorkout.id, workoutName)
    }

    useEffect(() => {

        if (!selectedWorkout?.id || workoutName === "") return;

        const timeout = setTimeout(() => {
            updateWorkout()
        }, 500)

        return () => clearTimeout(timeout);

    }, [workoutName])

    const [newExerciseName, setNewExerciseName] = useState("")
    const [newRestInterval, setNewRestInterval] = useState("")

    async function getExercises() {
        setExercises(await getExercisesByWorkoutId(db, selectedWorkout.id))
    }

    useEffect(() => {

        getExercises()
        setWorkoutName(selectedWorkout.name)

    }, [selectedWorkout, refreshExercises])

    function viewAddExercise(value: boolean) {
        scrollRef.current?.scrollTo({x: value ? width - spacing.lg * 2 : 0})
    }

    function handleCopyExercise(exercise: Exercise) {
        setClipboard(exercise)
        setCopiedExerciseId(exercise.id)
        setTimeout(() => {
            setCopiedExerciseId(null)
        }, 800)
    }

    async function handlePasteExercise() {
        if (clipboard) {
            setIsPasting(true)
            await pasteExercise(db, clipboard.id, selectedWorkout.id)
            if (settings?.vibrationFeedback === 1) {
                Vibration.vibrate(200)
            }
            setRefreshExercises(prev => !prev)
            exercisesRef.current?.scrollToEnd({animated: true})
            setTimeout(() => {
                setIsPasting(false)
            }, 800)
        }
    }

    async function handleCreateExercise() {
        await createExercise(db, selectedWorkout.id, newExerciseName, parseInt(newRestInterval, 10))
        if (settings?.vibrationFeedback === 1) {
            Vibration.vibrate(200)
        }
        setRefreshExercises(prev => !prev)
        viewAddExercise(false)
        goToSection(1)
        resetInput()
    }

    async function handleDeleteWorkout() {
        await deleteWorkout(db, selectedWorkout.id)
        if (settings?.vibrationFeedback === 1) {
            Vibration.vibrate(200)
        }
        setRefreshWorkouts(!refreshWorkouts)
    }

    function resetInput() {

        const timeout = setTimeout(() => {
            setNewExerciseName("")
            setNewRestInterval("")
        }, 500)
        
        return () => clearTimeout(timeout)
    }

    return (
        <ScrollView style={{width: width - spacing.lg * 2}} horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEnabled={false} ref={scrollRef}>
            <View style={{width: width - spacing.lg * 2}}>
                <RecordButton
                    theme={theme}
                    style={{ gap: spacing.md, paddingRight: spacing.lg }}
                >
                    <Pressable onPress={() => { goToSection(0); setRefreshWorkouts(prev => !prev) }} style={{paddingVertical: spacing.md}}>
                        <ChevronLeft size={textSizes.md} color={theme.text} />
                    </Pressable>
                    <DefaultInput theme={theme} placeholder={"Workout name..."} value={workoutName} onChangeText={setWorkoutName} />
                    <Pressable onPress={() => viewAddExercise(true)} style={{paddingVertical: spacing.md}}>
                        <Plus size={textSizes.md} color={theme.text} />
                    </Pressable>
                    <Pressable onPress={() => handlePasteExercise()} style={{paddingVertical: spacing.md}}>
                        {isPasting ? (
                            <Check size={textSizes.md} color={theme.text} />
                        ) : (
                            <ClipboardPaste size={textSizes.md} color={theme.text} />
                        )}
                    </Pressable>
                    <Pressable onPress={() => handleDeleteWorkout()} style={{paddingVertical: spacing.md}}>
                        <Trash2 size={textSizes.md} color={"red"} />
                    </Pressable>
                </RecordButton>
                <ScrollView showsVerticalScrollIndicator={false} ref={exercisesRef}>
                    {exercises
                    .map(exercise => (
                        <RecordButton
                            key={exercise.id}
                            theme={theme}
                            style={{ paddingHorizontal: spacing.lg }}
                            onPress={() => {
                                handleSelectExercise(exercise);
                            }}
                        >
                            <Pressable onPress={() => handleCopyExercise(exercise)} style={{paddingVertical: spacing.md}}>
                                {exercise.id === copiedExerciseId ? (
                                    <Check size={textSizes.md} color={theme.text} />
                                ): (
                                    <Copy size={textSizes.md} color={theme.text} />
                                )}
                                
                            </Pressable>
                            <Text style={{ fontSize: textSizes.sm, fontWeight: textWeights.regular, color: theme.text, marginRight: "auto", flexShrink: 1 }}>
                                {exercise.name}
                            </Text>
                            <ChevronRight size={textSizes.md} color={theme.text} />
                        </RecordButton>
                    ))}
                </ScrollView>
            </View>
            <View style={{width: width - spacing.lg * 2}}>
                <RecordButton
                    theme={theme}
                    style={{ gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}
                    onPress={() => { viewAddExercise(false); resetInput()}}
                >
                    <ChevronLeft size={textSizes.md} color={theme.text} />
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
                <RecordButton theme={theme} style={{flexDirection: "row", paddingHorizontal: spacing.lg, paddingVertical: spacing.md, gap: spacing.md}}>
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
                    <SubmitButton theme={theme} text={"Create exercise"} onPress={() => handleCreateExercise()} />
                </View>
            </View>
        </ScrollView>
    );
};

export default ExerciseSelector;
