import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import { useSQLiteContext } from "expo-sqlite";
import { ChevronLeft, ChevronRight, Dumbbell, Pencil } from "lucide-react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, Vibration, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import AdBanner from "../components/ads/adBanner";
import RecordButton from "../components/buttons/recordButton";
import SubmitButton from "../components/buttons/submitButton";
import DefaultInput from "../components/inputs/defaultInput";
import { spacing } from "../constants/spacing";
import { textSizes, textWeights } from "../constants/text";
import { BodyMetrics, ChartData, CompletedExerciseWithDate } from "../constants/types";
import { useAppSettingsContext } from "../contexts/appSettingsContext";
import { useThemeContext } from "../contexts/themeContext";
import { retrieveBodyMetricsHistory } from "../db/queries/body_metrics/retrieveBodyMetricsHistory";
import { saveBodymetrics } from "../db/queries/body_metrics/saveBodymetrics";
import { getCompletedExercisesWithStartDate } from "../db/queries/completed_exercises/getCompletedExercisesWithStartDate";
import { formatBodyMetricsChartData } from "../utilities/formatBodyMetricsChartData";
import { formatExercisesChartData } from "../utilities/formatExercisesChartData";
import { getLastMonday } from "../utilities/getLastMonday";

const { width, height } = Dimensions.get("window");

export default function AnalyticsScreen() {

    const { theme } = useThemeContext()
    const { settings } = useAppSettingsContext()
    const db = useSQLiteContext()

    const [timeframe, setTimeframe] = useState<"Week" | "Month" | "Year">("Week")
    const [startDate, setStartDate] = useState(getLastMonday())
    const [refreshMetrics, setRefreshmetrics] = useState(false)

    const onChange = (event: DateTimePickerEvent, date: Date | undefined) => {
        if (date) {
            setStartDate(date.toISOString().split('T')[0])
        }
    };

    const [metric, setMetric] = useState<"Weight" | "BF%" | "BMI">("Weight")
    const [bodyMetricsHistory, setBodymetricsHistory] = useState<BodyMetrics[] | null>()

    const mainRef = useRef<ScrollView>(null)
    const editRef = useRef<ScrollView>(null)

    const [showBodyMetrics, setShowBodyMetrics] = useState(false)
    const [showExercises, setShowExercises] = useState(false)

    function viewPage(value: boolean) {
        editRef.current?.scrollTo({x: value ? width : 0})
    }

    function getChartLabels(): string[] {
        if (timeframe === "Week") {
        return Array.from({ length: 7 }, (_, i) => {
            const currentDate = new Date(startDate);
            currentDate.setDate(currentDate.getDate() + i);
            return currentDate.getDate().toString();
        });
    }

        if (timeframe === "Month") {
            return ["Wk1", "Wk2", "Wk3", "Wk4"];
        }

        if (timeframe === "Year") {
            return ["Q1", "Q2", "Q3", "Q4"];
        }

        return [];
    }

    async function getBodyMetricsHistory() {
        const result = await retrieveBodyMetricsHistory(db)
        setBodymetricsHistory(result)
        if (result?.at(-1)?.weight) {
            setNewBodyWeight(result?.at(-1)?.weight.toString() ?? "")
        }
        if (result?.at(-1)?.bodyFatPercentage) {
            setNewBodyFatPercentage(result?.at(-1)?.bodyFatPercentage.toString() ?? "")
        }
        if (result?.at(-1)?.BMI) {
            setNewBMI(result?.at(-1)?.BMI.toString() ?? "")
        }
    }

    const [newBodyWeight, setNewBodyWeight] = useState("")
    const [newBodyFatPercentage, setNewBodyFatPercentage] = useState("")
    const [newBMI, setNewBMI] = useState("")

    const [BodyMetricsChartData, setBodyMetricsChartData] = useState<ChartData>({labels: getChartLabels(), datasets: []})

    useEffect(() => {
        if (bodyMetricsHistory) {
            setBodyMetricsChartData({
                labels: getChartLabels(),
                datasets:  [{ data: 
                    formatBodyMetricsChartData(
                        bodyMetricsHistory,
                        startDate,
                        timeframe,
                        metric
                    ).map(data => metric === "Weight" ? data.weight : metric === "BF%" ? data.bodyFatPercentage : data.BMI)
                }]
            })
        }
    }, [bodyMetricsHistory, timeframe, metric])

    useEffect(() => {
        getBodyMetricsHistory()
    }, [timeframe, startDate, refreshMetrics])

    async function saveBodyMetricsData() {
        await saveBodymetrics(db, {weight: parseInt(newBodyWeight, 10), bodyFatPercentage: parseInt(newBodyFatPercentage, 10), BMI: parseInt(newBMI, 10)})
        Vibration.vibrate(200)
        setRefreshmetrics(prev => !prev)
        viewPage(false)
    }

    const [exercisesHistory, setExercisesHistory] = useState<CompletedExerciseWithDate[]>([])
    const [exercisesChartData, setExercisesChartData] = useState<{chartData: ChartData, volume: number}>({chartData: {labels: getChartLabels(), datasets: []}, volume: 0})
    const [selectedExercise, setSelectedExercise] = useState<string | null>(null)

    const exerciseNames = useMemo(() => {
        return [...new Set(exercisesHistory.map(ex => ex.name))];
    }, [exercisesHistory]);

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const data = await getCompletedExercisesWithStartDate(db);
                setExercisesHistory(data)
                setSelectedExercise(data[0].name)
            })()   
        }, [])
    )

    useEffect(() => {
        console.log(startDate)
        if (selectedExercise) {
            const data = formatExercisesChartData(
                exercisesHistory,
                startDate,
                timeframe,
                selectedExercise
            );

            setExercisesChartData({chartData: {
                labels: getChartLabels(),
                datasets: [{ data: data.chartValues }]
            }, volume: data.totalVolume});
        }
    }, [timeframe, startDate, selectedExercise, exercisesHistory]);
    
    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} ref={editRef} scrollEnabled={false}>
                <View style={{flex: 1}}>
                    <View style={[styles.container, {paddingHorizontal: spacing.lg * 2}]}>
                        <View style={{flexDirection: "row", paddingTop: spacing.lg, flex: 0}}>
                            <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold}}>Analytics</Text>
                            <DateTimePicker
                                value={new Date(startDate)}
                                mode="date"
                                display="default"
                                style={{flex: 1, marginVertical: "auto", marginLeft: "auto"}}
                                textColor={theme.text}
                                themeVariant={theme.mode as "light" | "dark"}
                                onChange={onChange}
                            />
                        </View>
                        <ScrollView style={styles.timeframeContainer} contentContainerStyle={{gap: spacing.sm, paddingBottom: settings?.removeAds === 1 ? spacing.md : 0}} horizontal showsHorizontalScrollIndicator={false}>
                            <Pressable style={[styles.timeframe, {backgroundColor: timeframe === "Week" ? theme.text : theme.card}]} onPress={() => setTimeframe("Week")}>
                                <Text style={{fontSize: textSizes.sm, color: timeframe === "Week" ? theme.background : theme.text, fontWeight: textWeights.regular}}>Week</Text>
                            </Pressable>
                            <Pressable style={[styles.timeframe, {backgroundColor: timeframe === "Month" ? theme.text : theme.card}]} onPress={() => setTimeframe("Month")}>
                                <Text style={{fontSize: textSizes.sm, color: timeframe === "Month" ? theme.background : theme.text, fontWeight: textWeights.regular}}>Month</Text>
                            </Pressable>
                            <Pressable style={[styles.timeframe, {backgroundColor: timeframe === "Year" ? theme.text : theme.card}]} onPress={() => setTimeframe("Year")}>
                                <Text style={{fontSize: textSizes.sm, color: timeframe === "Year" ? theme.background : theme.text, fontWeight: textWeights.regular}}>Year</Text>
                            </Pressable>
                        </ScrollView>
                        <AdBanner style={{alignItems: "center", width: "100%", paddingBottom: spacing.sm}} id={"ca-app-pub-9362350160554339/5748345572"}/>
                    </View>

                    <ScrollView style={{flex: 1, gap: spacing.lg}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: spacing.lg}} ref={mainRef}>
                        
                        <View style={{width}}>
                            <View style={[styles.container, {paddingTop: 0}]}>
                                <RecordButton theme={theme} style={styles.section}>
                                    <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light}}>Body metrics</Text>
                                    <Text style={{fontSize: textSizes.md, color: theme.text, fontWeight: textWeights.bold, marginBottom: spacing.sm}}>
                                        {metric === "Weight" && bodyMetricsHistory?.at(-1)?.weight != null
                                        ? `${bodyMetricsHistory?.at(-1)?.weight}${settings?.weightUnit === "kg" ? "kg" : "lbs"}`
                                        : metric === "BF%" && bodyMetricsHistory?.at(-1)?.bodyFatPercentage != null
                                        ? `${bodyMetricsHistory?.at(-1)?.bodyFatPercentage}%`
                                        : metric === "BMI" && bodyMetricsHistory?.at(-1)?.BMI != null
                                        ? bodyMetricsHistory?.at(-1)?.BMI.toFixed(1)
                                        : "N/A"}
                                    </Text>
                                    <View style={{flexDirection: "row", gap: spacing.sm}}>
                                        <Pressable style={[styles.timeframe, {backgroundColor: metric === "Weight" ? theme.text : theme.card}]} onPress={() => setMetric("Weight")}>
                                            <Text style={{fontSize: textSizes.sm, color: metric === "Weight" ? theme.background : theme.text, fontWeight: textWeights.regular}} numberOfLines={1}>Weight</Text>
                                        </Pressable>
                                        <Pressable style={[styles.timeframe, {backgroundColor: metric === "BF%" ? theme.text : theme.card}]} onPress={() => setMetric("BF%")}>
                                            <Text style={{fontSize: textSizes.sm, color: metric === "BF%" ? theme.background : theme.text, fontWeight: textWeights.regular}} numberOfLines={1}>% BF</Text>
                                        </Pressable>
                                        <Pressable style={[styles.timeframe, {backgroundColor: metric === "BMI" ? theme.text : theme.card}]} onPress={() => setMetric("BMI")}>
                                            <Text style={{fontSize: textSizes.sm, color: metric === "BMI" ? theme.background : theme.text, fontWeight: textWeights.regular}} numberOfLines={1}>BMI</Text>
                                        </Pressable>
                                    </View>
                                </RecordButton>
                            </View>
                            <LineChart data={BodyMetricsChartData} width={width - spacing.lg * 2} height={height * .3} withVerticalLines={false} withDots={false} bezier style={{marginTop: spacing.md}} fromZero
                                chartConfig={{color: () => theme.text,
                                backgroundGradientFrom: theme.background,
                                backgroundGradientTo: theme.background,
                                decimalPlaces: 0,
                                propsForBackgroundLines: {
                                    strokeDashArray: undefined
                            }}}/>
                            <View style={{paddingHorizontal: spacing.lg}}>
                                <SubmitButton theme={theme} onPress={() => { viewPage(true); setShowBodyMetrics(true); setShowExercises(false) }}>
                                    <Pencil size={textSizes.sm} color={theme.background}/>
                                    <Text style={{fontSize: textSizes.sm, color: theme.background}}>Update records</Text>
                                </SubmitButton>
                            </View>
                        </View>

                        <View style={{width}}>
                            <View style={styles.container}>
                                <RecordButton theme={theme} style={styles.section}>
                                    <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.light}}>{selectedExercise} volume</Text>
                                    <Text style={{fontSize: textSizes.md, color: theme.text, fontWeight: textWeights.regular, marginBottom: spacing.sm}}>
                                        {exercisesChartData.volume && exercisesChartData?.volume > 0 ? `${exercisesChartData?.volume} ${settings?.weightUnit}` : 'N/A'}
                                    </Text>
                                </RecordButton>
                            </View>
                            <LineChart data={exercisesChartData.chartData} width={width - spacing.lg * 2} height={height * .3} withVerticalLines={false} withDots={false} bezier style={{marginTop: spacing.md}} fromZero
                                chartConfig={{color: () => theme.text, 
                                backgroundGradientFrom: theme.background,
                                backgroundGradientTo: theme.background,
                                decimalPlaces: 0,
                                propsForBackgroundLines: {
                                    strokeDashArray: undefined
                            }}}/>
                            <View style={{paddingHorizontal: spacing.lg}}>
                                <SubmitButton theme={theme} onPress={() => { viewPage(true); setShowBodyMetrics(false); setShowExercises(true) }}>
                                    <Dumbbell size={textSizes.sm} color={theme.background}/>
                                    <Text style={{fontSize: textSizes.sm, color: theme.background}}>Change exercise</Text>
                                </SubmitButton>
                            </View>
                        </View>

                    </ScrollView>
                </View>

                <View style={{width, display: showExercises ? "flex" : "none"}}>
                    <View style={styles.container}>
                        <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, paddingHorizontal: spacing.lg, paddingTop: spacing.lg}}>Exercises</Text>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                            <Pressable style={{paddingVertical: spacing.md}} onPress={() => viewPage(false)}>
                                <ChevronLeft size={textSizes.md} color={theme.text} />
                            </Pressable>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold}}>Select exercise</Text>
                        </RecordButton>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {exerciseNames.map((exercise) => (
                                <RecordButton key={exercise} theme={theme} style={{paddingVertical: spacing.md, paddingHorizontal: spacing.lg}} onPress={() => { setSelectedExercise(exercise); viewPage(false) }}>
                                    <Text
                                        style={{
                                            fontSize: textSizes.sm,
                                            color: theme.text,
                                            fontWeight: textWeights.regular,
                                            marginRight: "auto"
                                        }}
                                    >
                                        {exercise}
                                    </Text>
                                    <ChevronRight size={textSizes.md} color={theme.text}/>
                                </RecordButton>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <View style={{width, display: showBodyMetrics ? "flex" : "none", flex: 1}}>
                    <View style={styles.container}>
                        <Text style={{fontSize: textSizes.title, color: theme.text, fontWeight: textWeights.bold, paddingHorizontal: spacing.lg, paddingTop: spacing.lg}}>Body metrics</Text>
                        <RecordButton theme={theme} style={{paddingHorizontal: spacing.lg}}>
                            <Pressable style={{paddingVertical: spacing.md}} onPress={() => viewPage(false)}>
                                <ChevronLeft size={textSizes.md} color={theme.text} />
                            </Pressable>
                            <Text style={{fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.bold}}>Update records</Text>
                        </RecordButton>
                        <View style={{paddingHorizontal: spacing.lg, flex: 1}}>
                            <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, width: "50%", paddingVertical: spacing.md + spacing.sm  }}>
                                    {`Body Weight / ${settings?.weightUnit}: `}
                                </Text>
                                <DefaultInput
                                    theme={theme}
                                    placeholder={bodyMetricsHistory?.at(-1)?.weight != null ? `e.g. ${bodyMetricsHistory.at(-1)?.weight}` : "Enter weight..."}
                                    value={newBodyWeight}
                                    onChangeText={setNewBodyWeight}
                                    keyboardType="numeric"
                                />

                            </RecordButton>

                            <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, width: "50%", paddingVertical: spacing.md + spacing.sm }}>
                                    Body Fat %:
                                </Text>
                                <DefaultInput
                                    theme={theme}
                                    placeholder={bodyMetricsHistory?.at(-1)?.bodyFatPercentage != null ? `e.g. ${bodyMetricsHistory.at(-1)?.bodyFatPercentage}` : "Enter BF%..."}
                                    value={newBodyFatPercentage}
                                    onChangeText={setNewBodyFatPercentage}
                                    keyboardType="numeric"
                                />

                            </RecordButton>

                            <RecordButton theme={theme} style={{ paddingHorizontal: spacing.lg }}>
                                <Text style={{ fontSize: textSizes.sm, color: theme.text, fontWeight: textWeights.regular, width: "50%", paddingVertical: spacing.md + spacing.sm }}>
                                    BMI:
                                </Text>
                                <DefaultInput
                                    theme={theme}
                                    placeholder={bodyMetricsHistory?.at(-1)?.BMI != null ? `e.g. ${bodyMetricsHistory.at(-1)?.BMI}` : "Enter BMI..."}
                                    value={newBMI}
                                    onChangeText={setNewBMI}
                                    keyboardType="numeric"
                                />
                            </RecordButton>

                            
                        </View>
                        <SubmitButton theme={theme} onPress={() => saveBodyMetricsData()} style={{marginTop: "auto", marginBottom: spacing.lg}} text={"Save changes"} />
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        gap: spacing.sm,
        flex: 0,
    },
    timeframeContainer: {
        flexDirection: "row",
    },
    timeframe: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: spacing.md,
        flex: 0,
        alignItems: "center"
    },
    section: {
        padding: spacing.lg,
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
