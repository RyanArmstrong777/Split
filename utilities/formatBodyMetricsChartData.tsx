import { BodyMetrics } from "@/constants/types";

type Timeframe = "Week" | "Month" | "Year";
type Metric = "Weight" | "BF%" | "BMI";

export function formatBodyMetricsChartData( data: BodyMetrics[], startDate: string, timeframe: Timeframe, metric: Metric): BodyMetrics[] {

    const start = new Date(startDate);
    const map = new Map<string, BodyMetrics>();

    data.forEach((item) => {
        const key = item.date.slice(0, 10);
        map.set(key, item);
    });

    const result: BodyMetrics[] = [];

    function getMetricValue(record: BodyMetrics): number {

        if (metric === "Weight") return record.weight;
        if (metric === "BF%") return record.bodyFatPercentage;
        if (metric === "BMI") return record.BMI;

        return 0;

    }

    if (timeframe === "Week") {

        let lastKnownMetric: BodyMetrics | null = null;

        for (let i = 0; i < 7; i++) {

            const currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            const dateKey = currentDate.toISOString().slice(0, 10);

            const record = map.get(dateKey);

            if (record && getMetricValue(record) > 0) {
                lastKnownMetric = record;
                result.push(record);
            } else if (lastKnownMetric) {
                result.push({
                ...lastKnownMetric,
                id: -1,
                date: dateKey,
                });
            } else {
                result.push({
                id: -1,
                date: dateKey,
                weight: 0,
                bodyFatPercentage: 0,
                BMI: 0,
                });
            }
        }

    } else if (timeframe === "Month") {
        const year = start.getFullYear();
        const month = start.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        let lastKnownMetric: BodyMetrics | null = null;

        for (let day = 1; day <= daysInMonth; day++) {

            const currentDate = new Date(year, month, day);
            const dateKey = currentDate.toISOString().slice(0, 10);

            const dayRecord = map.get(dateKey);

            if (dayRecord && getMetricValue(dayRecord) > 0) {
                lastKnownMetric = dayRecord;
                result.push(dayRecord);
            } else if (lastKnownMetric) {
                result.push({
                ...lastKnownMetric,
                id: -1,
                date: dateKey,
                });
            } else {
                result.push({
                id: -1,
                date: dateKey,
                weight: 0,
                bodyFatPercentage: 0,
                BMI: 0,
                });
            }
        }

    } else if (timeframe === "Year") {

        const year = start.getFullYear();
        let lastKnownMetric: BodyMetrics | null = null;

        for (let month = 0; month < 12; month++) {
            
            const monthRecords = data.filter((item) => {
                const date = new Date(item.date);
                return date.getFullYear() === year && date.getMonth() === month;
            });

            const placeholderDate = new Date(year, month, 1)
                .toISOString()
                .slice(0, 10);

            if (monthRecords.length > 0) {
                const last = monthRecords.reduce((a, b) =>
                    new Date(a.date) > new Date(b.date) ? a : b
                );
                result.push(last);
                lastKnownMetric = last;
            } else if (lastKnownMetric) {
                result.push({
                ...lastKnownMetric,
                id: -1,
                date: placeholderDate,
                });
            } else {
                result.push({
                id: -1,
                date: placeholderDate,
                weight: 0,
                bodyFatPercentage: 0,
                BMI: 0,
                });
            }
        }
    }

    return result;
}
