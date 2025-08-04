import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useRef, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import CreateNewSplit from "../components/planner/createNewSplit";
import ScheduleEditor from "../components/planner/scheduleEditor";
import SplitEditor from "../components/planner/splitEditor";
import SplitsDisplay from "../components/planner/splitsDisplay";
import { spacing } from "../constants/spacing";
import { textSizes, textWeights } from "../constants/text";
import { Split } from "../constants/types";
import { useSplitContext } from "../contexts/splitContext";
import { useThemeContext } from "../contexts/themeContext";

const { width, height } = Dimensions.get("window");

export default function Splits() {

    const { theme } = useThemeContext();
    const { splits, setRefreshSplits } = useSplitContext();
    
    const db = useSQLiteContext();

    const [selectedSplit, setSelectedSplit] = useState({} as Split);

    const [isEditing, setIsEditing] = useState(true)

    const scrollRef = useRef<ScrollView>(null);

    function goToPage(page: number) {
        scrollRef.current?.scrollTo({x: page * width})
    }

    useEffect(() => {
        goToPage(0)
    }, [])

    return (
        <SafeAreaView style={[styles.background, { backgroundColor: theme.background }]}>
            <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, padding: spacing.lg * 2, paddingBottom: 0}}>Planner</Text>
            <ScrollView ref={scrollRef} style={{flex: 1}} showsHorizontalScrollIndicator={false} scrollEnabled={false} pagingEnabled horizontal>

                <SplitsDisplay theme={theme} splits={splits} goToPage={goToPage} setSelectedSplit={setSelectedSplit} setIsEditing={setIsEditing} />

                <CreateNewSplit theme={theme} db={db} goToPage={goToPage} setRefreshSplits={setRefreshSplits} style={{display: isEditing ? "none" : "flex"}} />

                <SplitEditor theme={theme} db={db} splits={splits} setRefreshSplits={setRefreshSplits} selectedSplit={selectedSplit} goToPage={goToPage} style={{display: isEditing ? "flex" : "none"}} />

                <ScheduleEditor theme={theme} db={db} goToPage={goToPage} selectedSplit={selectedSplit} />

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    background: {
        width,
        height: height - 110,
        gap: spacing.lg,
        flex: 1,
    },
    scrollPage: {
        width,
        flex: 1,
        paddingHorizontal: spacing.lg,
    }
});