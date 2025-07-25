import React, { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react";
import { ScrollView, Text, Dimensions, View, Pressable } from "react-native";
import { Plus, ChevronRight, ChevronLeft, Copy, ClipboardPaste, Check } from "lucide-react-native";
import RecordButton from "../../buttons/recordButton";
import { textSizes, textWeights } from "@/constants/text";
import { spacing } from "@/constants/spacing";
import { getDateAsDayNumber } from "@/db/utilities/getDateAsDayNumber";
import { Split, Workout } from "@/constants/types";
import DefaultInput from "@/components/inputs/defaultInput";
import SubmitButton from "@/components/buttons/submitButton";
import { createWorkout } from "@/db/queries/workouts/createWorkout";
import { SQLiteDatabase } from "expo-sqlite";
import { getWorkoutsOnDay } from "@/db/queries/workouts/getWorkoutsOnDay";
import { definitions } from "@/constants/definitions";
import { pasteWorkout } from "@/db/queries/workouts/pasteWorkout";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";

type props = {
    db: SQLiteDatabase
    selectedDate: string
    selectedSplit: Split
    refreshWorkouts: boolean
    workouts: Workout[]
    setRefreshWorkouts: React.Dispatch<React.SetStateAction<boolean>>
    setWorkouts: (schedules: Workout[]) => void
    setSelectedWorkout: (workout: Workout) => void
    goToSection: (section: number) => void
    theme: any
};

const { width } = Dimensions.get("window");

const WorkoutSelector = forwardRef(({
    db,
    selectedDate,
    selectedSplit,
    refreshWorkouts,
    setRefreshWorkouts,
    workouts,
    setWorkouts,
    setSelectedWorkout,
    goToSection,
    theme,
}: props, ref) => {

    const scrollRef = useRef<ScrollView>(null)
    const workoutsRef = useRef<ScrollView>(null)

    const { refreshKey } = useAppSettingsContext()

    const [newWorkoutName, setNewWorkoutName] = useState("")

    const [clipboard, setClipboard] = useState<Workout | null>(null)
    const [copiedWorkoutId, setCopiedWorkoutId] = useState<number | null>()
    const [isPastingWorkout, setIsPastingWorkout] = useState(false)

    function handleSelectSchedule(schedule: Workout) {
        setSelectedWorkout(schedule)
        goToSection(1)
    }

    function viewAddWorkout(value: boolean) {
        scrollRef.current?.scrollTo({x: value ? width - spacing.lg * 2 : 0})
    }

    useEffect(() => {
        async function getWorkouts() {
            const w = await getWorkoutsOnDay(db, selectedSplit.id, getDateAsDayNumber(selectedDate));
            setWorkouts(w);
        }
        getWorkouts()
        goToSection(0)
    }, [selectedDate, selectedSplit, refreshWorkouts, refreshKey])

    async function handleCreateWorkout() {
        await createWorkout({db: db, name: newWorkoutName, splitId: selectedSplit.id, day: getDateAsDayNumber(selectedDate)})
        setRefreshWorkouts(!refreshWorkouts)
        viewAddWorkout(false)
        setNewWorkoutName("")
    }

    function handleCopyWorkout(workout: Workout) {
        setClipboard(workout)
        setCopiedWorkoutId(workout.id)
        setTimeout(() => {
            setCopiedWorkoutId(null)
        }, 800)
    }

    async function handlePasteWorkout() {
        if (clipboard) {
            await pasteWorkout(db, clipboard.id, selectedSplit.id, getDateAsDayNumber(selectedDate))
            setIsPastingWorkout(true)
            setRefreshWorkouts(prev => !prev);
            setTimeout(() => {
                setIsPastingWorkout(false)
            }, 800)
            workoutsRef.current?.scrollToEnd({animated: true})
        }
    }

    function handleGoBack() {

        viewAddWorkout(false)

        const timeout = setTimeout(() => {
            setNewWorkoutName("")
        }, 500)

        return () => clearTimeout(timeout)
    }

    useImperativeHandle(ref, () => ({
        viewAddWorkout,
    }));

    return (
        <View style={{flex: 1}}>
            <RecordButton
                theme={theme}
                style={{ paddingHorizontal: spacing.lg }}
            >
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        color: theme.text,
                        fontWeight: textWeights.bold,
                        marginRight: "auto",
                        paddingVertical: spacing.md
                    }}
                >
                    Workouts
                </Text>
                <Pressable onPress={() => viewAddWorkout(true)} style={{paddingVertical: spacing.md}}>
                    <Plus size={textSizes.md} color={theme.text} />
                </Pressable>
                <Pressable onPress={() => handlePasteWorkout()}>
                    {isPastingWorkout ? (
                        <Check size={textSizes.md} color={theme.text} />
                    ) : (
                        <ClipboardPaste size={textSizes.md} color={theme.text} />
                    )}
                </Pressable>
            </RecordButton>
            <ScrollView style={{width: width - spacing.lg * 2}} horizontal pagingEnabled showsHorizontalScrollIndicator={false} scrollEnabled={false} ref={scrollRef}>
                <ScrollView style={{ flex: 1, width: width - spacing.lg * 2 }} showsVerticalScrollIndicator={false} ref={workoutsRef}>
                    {workouts
                        .map((workout) => (
                            <RecordButton
                                key={workout.id}
                                theme={theme}
                                style={{ paddingHorizontal: spacing.lg }}
                            >
                                <Pressable onPress={() => handleCopyWorkout(workout)} style={{paddingVertical: spacing.md}}>
                                    {copiedWorkoutId === workout.id ? (
                                        <Check size={textSizes.md} color={theme.text} />
                                    ) : (
                                        <Copy size={textSizes.md} color={theme.text} />
                                    )}
                                </Pressable>
                                <Pressable style={{flex: 1, paddingVertical: spacing.md, flexDirection: "row"}} onPress={() => handleSelectSchedule(workout)}>
                                    <Text
                                        style={{
                                            fontSize: textSizes.sm,
                                            color: theme.text,
                                            fontWeight: textWeights.regular,
                                            marginRight: "auto",
                                        }}
                                    >
                                        {workout.name}
                                    </Text>
                                    <ChevronRight size={textSizes.md} color={theme.text} />
                                </Pressable>
                            </RecordButton>
                        ))
                    }
                    <Text
                        style={{
                            fontSize: textSizes.xs,
                            fontWeight: textWeights.light,
                            color: theme.text,
                            paddingHorizontal: spacing.lg,
                            textAlign: "left",
                            paddingVertical: spacing.md
                        }}
                    >
                        {definitions.workout}
                    </Text>
                </ScrollView>
                <View style={{width: width - spacing.lg * 2, gap: spacing.md}}>
                    <RecordButton
                        theme={theme}
                        style={{ gap: spacing.md, paddingHorizontal: spacing.lg }}
                        
                    >
                        <Pressable onPress={() => handleGoBack()} style={{paddingVertical: spacing.md}}>
                            <ChevronLeft size={textSizes.md} color={theme.text} />
                        </Pressable>
                        <Text
                            style={{
                                fontSize: textSizes.sm,
                                fontWeight: textWeights.bold,
                                color: theme.text,
                            }}
                        >
                            Back
                        </Text>
                    </RecordButton>
                    <DefaultInput
                        theme={theme}
                        value={newWorkoutName}
                        onChangeText={setNewWorkoutName}
                        placeholder={"Workout name..."}
                        style={{ paddingHorizontal: spacing.lg, flex: 0 }}
                    />
                    <Text
                        style={{
                            fontSize: textSizes.xs,
                            fontWeight: textWeights.light,
                            color: theme.text,
                            paddingHorizontal: spacing.lg
                        }}
                        
                    >
                        {definitions.newWorkout}
                    </Text>
                    <View style={{ marginTop: "auto", marginBottom: spacing.lg, paddingHorizontal: 1 }}>
                        <SubmitButton theme={theme} text={"Create workout"} onPress={() => handleCreateWorkout()} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
});

export type WorkoutSelectorHandle = {
    viewAddWorkout: (value: boolean) => void;
};

export default WorkoutSelector;
