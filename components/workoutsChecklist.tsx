import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { useState, useRef, useEffect, forwardRef } from "react";
import { spacing } from "../constants/spacing";
import { useSQLiteContext } from "expo-sqlite";
import { CompletedExercise, CompletedSet, Theme, CompletedWorkout, Workout } from "@/constants/types";
import { getWeightUnits } from "@/db/queries/app_settings/getWeightUnits";
import ExercisesChecklist from "./checklist/exercisesChecklist";
import SetsChecklist from "./checklist/setsChecklist";
import SetDetails from "./checklist/setDetails";

const { width } = Dimensions.get("window");

type WorkoutChecklistRef = {
    viewExercises: (date: string) => void;
};

const WorkoutChecklist = forwardRef<WorkoutChecklistRef, { theme: Theme, resetPage: boolean, splitId: number | null, selectedDate: string, selectedWorkout: (CompletedWorkout & Workout) | null }>(({theme, resetPage, selectedDate, selectedWorkout, splitId}, ref) => {

    const db = useSQLiteContext();

    const scrollRef = useRef<ScrollView>(null);

    const [selectedExercise, setSelectedExercise] = useState({} as CompletedExercise)
    const [selectedSet, setSelectedSet] = useState<CompletedSet | null>(null)

    const [refreshExercises, setRefreshExercises] = useState(true)
    const [refreshSets, setRefreshSets] = useState(true)

    const [weightUnits, setWeightUnits] = useState("");

    const goToPage = (pageNumber: number) => {
        scrollRef.current?.scrollTo({ x: pageNumber * width, animated: true });
    };

    async function fetchUnits() {
        const units = await getWeightUnits(db);
        setWeightUnits(units);
    }

    useEffect(() => {
        fetchUnits()
        goToPage(0)
    }, [resetPage])

    return (
        <ScrollView
            ref={scrollRef}
            style={styles.exercisesPager}
            showsHorizontalScrollIndicator={false}
            horizontal
            pagingEnabled
            scrollEnabled={false}
        >
            <ExercisesChecklist db={db} splitId={splitId} goToPage={goToPage} selectedDate={selectedDate} selectedWorkout={selectedWorkout} theme={theme} setSelectedExercise={setSelectedExercise} refreshExercises={refreshExercises} setRefreshExercises={setRefreshExercises} />
            
            <SetsChecklist db={db} theme={theme} selectedExercise={selectedExercise} setRefreshExercises={setRefreshExercises} setSelectedExercise={setSelectedExercise} setSelectedSet={setSelectedSet} weightUnits={weightUnits} goToPage={goToPage} refreshSets={refreshSets} setRefreshSets={setRefreshSets} />

            <SetDetails theme={theme} db={db} setRefreshSets={setRefreshSets} setRefreshExercises={setRefreshExercises} selectedSet={selectedSet} setSelectedSet={setSelectedSet} selectedExercise={selectedExercise} weightUnits={weightUnits} goToPage={goToPage} />
        </ScrollView>
    );
});

export default WorkoutChecklist;

const styles = StyleSheet.create({
    exercisesPager: {
        height: "auto",
        marginBottom: spacing.lg,
    },
    pageView: {
        width,
        paddingHorizontal: spacing.lg
    },
    exercisesContainer: {
        width: "auto",
        height: "auto"
    },
    exerciseContainer: {
        flexDirection: "row",
        width: "100%",
        gap: spacing.lg,
        paddingVertical: spacing.md,
        borderBottomWidth: 0.5,
        alignItems: "center",
    },
    setsTitle: {
        alignItems: "center"
    }
});