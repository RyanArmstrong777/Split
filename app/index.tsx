import { textSizes, textWeights } from "@/constants/text";
import { CompletedWorkout, Workout } from "@/constants/types";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";
import { useSplitContext } from "@/contexts/splitContext";
import { useThemeContext } from "@/contexts/themeContext";
import { getActiveCompletedWorkoutsForWeek } from "@/db/queries/completed_workouts.tsx/getActiveCompletedWorkoutsForWeek";
import { scheduleSplit } from "@/db/queries/splits/scheduleSplit";
import { getDateAsDayNumber } from "@/utilities/getDateAsDayNumber";
import { getLastMonday } from "@/utilities/getLastMonday";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import HeaderSlideshow from "../components/HeaderSlideshow";
import WeeklyCalendar from "../components/weeklyCalendar";
import WorkoutChecklist from "../components/workoutsChecklist";
import { spacing } from "../constants/spacing";

const { width, height } = Dimensions.get("window");

export default function WorkoutScreen() {

    const db = useSQLiteContext();
    const { split } = useSplitContext();
    const { refreshKey, triggerRefresh } = useAppSettingsContext();

    const today = new Date().toISOString().split('T')[0];

    const { theme } = useThemeContext();
    const [selectedDate, setSelectedDate] = useState(today);
    const [seedingAttempted, setSeedingAttempted] = useState(false)
    const [workouts, setWorkouts] = useState<(CompletedWorkout & Workout)[] | null>(null)
    const [selectedWorkout, setSelectedWorkout] = useState<(CompletedWorkout & Workout) | null>(null);

    const workoutChecklistRef = useRef<any>(null)

    async function getWorkouts() {
        if (split) {
            const workouts = await getActiveCompletedWorkoutsForWeek(db, getLastMonday(), split.id)
            if (workouts === null) {
                if (!seedingAttempted) {
                    scheduleSplit(db, split.id, getDateAsDayNumber(today))
                    setSeedingAttempted(true)
                }
                triggerRefresh()
            }
            setWorkouts(workouts);
        }
        workoutChecklistRef.current?.viewExercises(selectedDate);
    }

    useEffect(() => {
        getWorkouts();
    }, [split, refreshKey]);

    useEffect(() => {
        setSelectedDate(today)
    }, [split])

    useEffect(() => {
        if (workouts) {
            setSelectedWorkout(workouts.find(w => w.startDate === selectedDate) ?? null)
        }
    }, [selectedDate, workouts])
    
    return (
        <View style={[styles.background, { backgroundColor: theme.background }]}>
            <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, padding: spacing.lg * 2, paddingBottom: 0}}>Workout</Text>
            <WeeklyCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} theme={theme} style={{marginTop: spacing.lg}} />
            <HeaderSlideshow selectedDate={selectedDate} setSelectedDate={setSelectedDate} today={today} selectedWorkout={selectedWorkout} theme={theme} />
            <WorkoutChecklist ref={workoutChecklistRef} theme={theme} resetPage={refreshKey} selectedDate={selectedDate} selectedWorkout={selectedWorkout} splitId={split?.id ?? null} />
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        width,
        flex: 1,
        gap: spacing.md
    },
});
