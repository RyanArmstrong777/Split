import { CompletedExerciseWithDate } from "../constants/types";

export function formatExercisesChartData(
    data: CompletedExerciseWithDate[],
    startDate: string,
    timeframe: "Week" | "Month" | "Year",
    exerciseName: string
): { chartValues: number[]; totalVolume: number } {
    function calculateEndDate(start: string, frame: "Week" | "Month" | "Year"): Date {
        const startD = new Date(start);
        if (frame === "Week") startD.setDate(startD.getDate() + 7);
        else if (frame === "Month") startD.setMonth(startD.getMonth() + 1);
        else if (frame === "Year") startD.setFullYear(startD.getFullYear() + 1);
        return startD;
    }

    function formatDate(date: Date): string {
        return date.toISOString().slice(0, 10);
    }

    const start = new Date(startDate);
    const end = calculateEndDate(startDate, timeframe);

    const volumeMap = new Map<string, number>();
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        volumeMap.set(formatDate(d), 0);
    }

    const filteredExercises = data.filter(ex =>
        ex.name === exerciseName &&
        new Date(ex.startDate) >= start &&
        new Date(ex.startDate) < end
    );

    for (const ex of filteredExercises) {
        const dateStr = formatDate(new Date(ex.startDate));
        volumeMap.set(dateStr, (volumeMap.get(dateStr) || 0) + ex.volume);
    }

    const chartValues: number[] = [];
    let lastVolume = 0;
    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const dayStr = formatDate(d);
        const volume = volumeMap.get(dayStr) ?? 0;
        if (volume === 0) {
            chartValues.push(lastVolume);
        } else {
            chartValues.push(volume);
            lastVolume = volume;
        }
    }

    const totalVolume = filteredExercises.reduce((acc, ex) => acc + ex.volume, 0);

    return { chartValues, totalVolume };
}
