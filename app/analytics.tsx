import { useState, useEffect } from "react";
import { StyleSheet, Dimensions, SafeAreaView, Text, View, Pressable, ScrollView } from "react-native";
import { useThemeContext } from "@/contexts/themeContext";
import { spacing } from "../constants/spacing";
import { textSizes, textWeights } from "@/constants/text";
import RecordButton from "@/components/buttons/recordButton";
import Chart from "@/components/analytics/chart";
import { retrieveBodyMetricsHistory } from "@/db/queries/body_metrics/retrieveBodyMetricsHistory";
import { BodyMetrics } from "@/constants/types";
import { useSQLiteContext } from "expo-sqlite";

const { width, height } = Dimensions.get("window");

export default function AnalyticsScreen() {

    const { theme } = useThemeContext()

    const db = useSQLiteContext()

    const [timeframe, setTimeframe] = useState("Week")

    const [bodyMetricsHistory, setBodyMetricsHistory] = useState<BodyMetrics[] | null>(null)
    const [refreshBodyMetrics, setRefreshBodyMetrics] = useState(true)

    async function getBodyMetricstHistory() {
        const history = await retrieveBodyMetricsHistory(db)
        console.log(history)
        setBodyMetricsHistory(history)
    }

    useEffect(() => {
        getBodyMetricstHistory()
    }, [refreshBodyMetrics])
    
    return (
        <SafeAreaView style={[styles.background, { backgroundColor: theme.background }]}>
            <View style={styles.container}>
                <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, paddingHorizontal: spacing.lg, paddingTop: spacing.lg}}>Analytics</Text>
                <ScrollView style={styles.timeframeContainer} contentContainerStyle={{gap: spacing.sm}} horizontal showsHorizontalScrollIndicator={false}>
                    <Pressable style={[styles.timeframe, {backgroundColor: theme.card}]}>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>All time</Text>
                    </Pressable>
                    <Pressable style={[styles.timeframe, {backgroundColor: theme.card}]}>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>Week</Text>
                    </Pressable>
                    <Pressable style={[styles.timeframe, {backgroundColor: theme.card}]}>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>Month</Text>
                    </Pressable>
                    <Pressable style={[styles.timeframe, {backgroundColor: theme.card}]}>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>Year</Text>
                    </Pressable>
                </ScrollView>
            </View>
            <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
                <RecordButton theme={theme} style={styles.section}>
                    <Text style={{fontSize: textSizes.md, color: theme.text, fontWeight: textWeights.bold}}>Body metrics</Text>
                    <View style={{flexDirection: "row", gap: spacing.md}}>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>83kg</Text>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>7% BF</Text>
                        <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular}}>BMI 20</Text>
                    </View>
                    <ScrollView style={styles.chartWrapper} horizontal>
                        <Chart theme={theme} data={ bodyMetricsHistory?.map(metric => ({ x: metric.date, y: metric.weight })) ?? []} xKey={"x"} yKey={"y"} xTitle={"Time"} yTitle={"Body Weight"} timeframe={timeframe} />
                        <Chart theme={theme} data={ bodyMetricsHistory?.map(metric => ({ x: metric.date, y: metric.weight })) ?? []} xKey={"x"} yKey={"y"} xTitle={"Time"} yTitle={"Body Fat %"} timeframe={timeframe} />
                        <Chart theme={theme} data={ bodyMetricsHistory?.map(metric => ({ x: metric.date, y: metric.weight })) ?? []} xKey={"x"} yKey={"y"} xTitle={"Time"} yTitle={"BMI"} timeframe={timeframe} />
                    </ScrollView>
                </RecordButton>   
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        width,
        height: height - 110,
    },
    container: {
        padding: spacing.lg,
        gap: spacing.md
    },
    timeframeContainer: {
        flexDirection: "row"
    },
    timeframe: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: spacing.md,
        flex: 1,
        alignItems: "center"
    },
    section: {
        padding: spacing.lg,
        backgroundColor: "red",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: spacing.sm
    },
    chartWrapper: {
        flex: 1,
        backgroundColor: "green",
        height: height * 0.3
    }
});
