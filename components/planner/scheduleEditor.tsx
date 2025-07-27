import React, { useState, useEffect, useRef } from "react";
import { ScrollView, Dimensions, Text, StyleSheet, View, Pressable } from "react-native";
import { spacing } from "@/constants/spacing";
import { Split, Theme, Exercise, Set, Workout } from "@/constants/types";
import WorkoutSelector from "./selectors/WorkoutSelector";
import ExerciseSelector from "./selectors/exerciseSelector";
import SetSelector from "./selectors/setSelector";
import { getWeightUnits } from "@/db/queries/app_settings/getWeightUnits";
import { getExercisesByWorkoutId } from "@/db/queries/exercises/getExercisesByWorkoutId";
import { getSetsByExerciseId } from "@/db/queries/sets/getSetsByExerciseId";
import SetEditor from "./selectors/SetEditor";
import { getLastMonday } from "@/utilities/getLastMonday";
import { ChevronLeft } from "lucide-react-native";
import RecordButton from "../buttons/recordButton";
import { textSizes, textWeights } from "@/constants/text";
import WeeklyCalendar from "../weeklyCalendar";
import { WorkoutSelectorHandle } from "./selectors/WorkoutSelector";
import { CompletedWorkout } from "@/constants/types";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";

const { width } = Dimensions.get("window");

type props = {
    theme: Theme
    db: any
    selectedSplit: Split
    goToPage: (page: number) => void
}

const ScheduleEditor = ({
    theme,
    db,
    selectedSplit,
    goToPage
}: props) => {

    const scrollRef = useRef<ScrollView>(null);

    const workoutSelectorRef = useRef<WorkoutSelectorHandle>(null);

    const { settings, refreshKey } = useAppSettingsContext()

    const [selectedDate, setSelectedDate] = useState(getLastMonday())

    const [selectedWorkout, setSelectedWorkout] = useState({} as Workout);
    const [refreshWorkouts, setRefreshWorkouts] = useState(true)

    const [selectedExercise, setSelectedExercise] = useState({} as Exercise)
    const [refreshExercises, setRefreshExercises] = useState(true)

    const [refreshSets, setRefreshSets] = useState(true)

    function goToSection(section: number) {
        scrollRef.current?.scrollTo({x: section * (width - spacing.lg * 2)})
    }

    const [sets, setSets] = useState([] as Set[])
    const [selectedSet, setSelectedSet] = useState({} as Set)

    async function getSets() {
        setSets(await getSetsByExerciseId(db, selectedExercise.id))
    }

    useEffect(() => {
        getSets()
    }, [selectedExercise, refreshSets, refreshKey])

    useEffect(() => {
        goToSection(2)
    }, [selectedExercise])

    useEffect(() => {
        goToSection(0)
    }, [selectedSplit])

    useEffect(() => {
        goToPage(0)
    }, [refreshKey])

    function resetScrollViews() {
        workoutSelectorRef.current?.viewAddWorkout(false)
        goToPage(1)
        goToSection(0)
    }

    return (
        <View style={styles.scrollPage}>

            <RecordButton
                theme={theme}
                style={{ paddingRight: spacing.lg, gap: spacing.md }}
            >
                <Pressable onPress={() => resetScrollViews()} style={{paddingVertical: spacing.md}}>
                    <ChevronLeft size={textSizes.md} color={theme.text} />
                </Pressable>
                <Text
                    style={{
                        fontSize: textSizes.sm,
                        fontWeight: textWeights.bold,
                        color: theme.text,
                        flexShrink: 1,
                        paddingVertical: spacing.md
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {selectedSplit.name}
                </Text>
            </RecordButton>

            <RecordButton theme={theme} style={{justifyContent: "center", borderBottomWidth: 0, paddingTop: spacing.md}}>
                <WeeklyCalendar theme={theme} selectedDate={selectedDate} setSelectedDate={setSelectedDate} goToSection={goToSection} />
            </RecordButton>

            <ScrollView horizontal pagingEnabled scrollEnabled={false} ref={scrollRef} style={{marginTop: spacing.lg}}>
                <WorkoutSelector goToSection={goToSection} selectedDate={selectedDate} selectedSplit={selectedSplit} refreshWorkouts={refreshWorkouts} setRefreshWorkouts={setRefreshWorkouts} theme={theme} setSelectedWorkout={setSelectedWorkout} ref={workoutSelectorRef} db={db} />

                <ExerciseSelector goToSection={goToSection} theme={theme} refreshWorkouts={refreshWorkouts} setRefreshWorkouts={setRefreshWorkouts} refreshExercises={refreshExercises} setRefreshExercises={setRefreshExercises} selectedWorkout={selectedWorkout} setSelectedExercise={setSelectedExercise} db={db} />

                <SetSelector goToSection={goToSection} theme={theme} sets={sets} weightUnits={settings?.weightUnit} refreshExercises={refreshExercises} setRefreshExercises={setRefreshExercises} selectedExercise={selectedExercise} setSelectedSet={setSelectedSet} db={db} />

                <SetEditor goToSection={goToSection} theme={theme} weightUnits={settings?.weightUnit} refreshSets={refreshSets} setRefreshSets={setRefreshSets} selectedSet={selectedSet} db={db} />
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    scrollPage: {
        width,
        flex: 1,
        paddingHorizontal: spacing.lg,
    },
});

export default ScheduleEditor;
