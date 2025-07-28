import { spacing } from "@/constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import { Exercise, Set, Split, Theme, Workout } from "@/constants/types";
import { useAppSettingsContext } from "@/contexts/appSettingsContext";
import { getSetsByExerciseId } from "@/db/queries/sets/getSetsByExerciseId";
import { getLastMonday } from "@/utilities/getLastMonday";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AdBanner from "../ads/adBanner";
import RecordButton from "../buttons/recordButton";
import WeeklyCalendar from "../weeklyCalendar";
import SetEditor from "./selectors/SetEditor";
import WorkoutSelector, { WorkoutSelectorHandle } from "./selectors/WorkoutSelector";
import ExerciseSelector from "./selectors/exerciseSelector";
import SetSelector from "./selectors/setSelector";

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
    const [selectedSet, setSelectedSet] = useState<Set | null>(null)

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

                <SetEditor goToSection={goToSection} theme={theme} weightUnits={settings?.weightUnit} refreshSets={refreshSets} setRefreshSets={setRefreshSets} selectedSet={selectedSet} setSelectedSet={setSelectedSet} db={db} />
            </ScrollView>

            <View style={{alignItems: "center", width: "100%", paddingVertical: spacing.sm}}>
                <AdBanner />
            </View>

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
