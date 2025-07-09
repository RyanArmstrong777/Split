import { StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useThemeContext } from "@/contexts/themeContext";
import WeeklyCalendar from "../components/weeklyCalendar";
import { spacing } from "../constants/spacing";
import { useSQLiteContext } from "expo-sqlite";
import WorkoutChecklist from "../components/workoutsChecklist";
import HeaderSlideshow from "../components/HeaderSlideshow";
import { useSplitContext } from "@/contexts/splitContext";
import { getActiveCompletedWorkoutForDate } from "@/db/queries/completed_workouts.tsx/getActiveCompletedWorkoutsForDate";
import { CompletedWorkout, Workout } from "@/constants/types";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";

const { width, height } = Dimensions.get("window");

export default function WorkoutScreen() {

    const db = useSQLiteContext();
    const { split } = useSplitContext();
    const { refreshKey } = useAppSettingsContext();

    const today = new Date().toISOString().split('T')[0];

    const { theme } = useThemeContext();
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedWorkout, setSelectedWorkout] = useState<(CompletedWorkout & Workout) | null>(null);

    const workoutChecklistRef = useRef<any>(null)

    useEffect(() => {
        async function getWorkout() {

            if (split) {
                setSelectedWorkout(await getActiveCompletedWorkoutForDate(db, selectedDate, split.id));
            }

            workoutChecklistRef.current?.viewExercises(selectedDate);
        }
        getWorkout();

    }, [selectedDate, split, refreshKey]);

    useEffect(() => {
        setSelectedDate(today)
    }, [split])
    
    return (
        <SafeAreaView style={[styles.background, { backgroundColor: theme.background }]}>
            <WeeklyCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} theme={theme} style={{marginTop: spacing.lg}} />
            <HeaderSlideshow selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} selectedWorkout={selectedWorkout} theme={theme} />
            <WorkoutChecklist ref={workoutChecklistRef} theme={theme} resetPage={refreshKey} selectedDate={selectedDate} selectedWorkout={selectedWorkout} splitId={split?.id ?? null} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        width,
        height: height - 110,
        gap: spacing.md
    },
    pageTitle: {
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        maxHeight: height * .1
    },
});
