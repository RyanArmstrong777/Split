import { BodyMetrics } from "@/constants/types";

type Timeframe = "Week" | "Month" | "Year";
type Metric = "Weight" | "BF%" | "BMI";

export function formatBodyMetricsChartData(
  data: BodyMetrics[],
  startDate: string,
  timeframe: Timeframe,
  metric: Metric
): BodyMetrics[] {
  const start = new Date(startDate);

  // Step 1: Sort data by date ascending
  const sorted = [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Step 2: Create a Map of most recent record per day
  const dailyMap = new Map<string, BodyMetrics>();
  for (const item of sorted) {
    const key = new Date(item.date).toISOString().slice(0, 10);
    // Always overwrite, since sorted ascending — latest will stay
    dailyMap.set(key, item);
  }

  const result: BodyMetrics[] = [];

  const getMetricValue = (record: BodyMetrics): number => {
    if (metric === "Weight") return record.weight;
    if (metric === "BF%") return record.bodyFatPercentage;
    if (metric === "BMI") return record.BMI;
    return 0;
  };

  let lastKnown: BodyMetrics | null = null;

  const addRecord = (date: Date) => {
    const dateKey = date.toISOString().slice(0, 10);
    const record = dailyMap.get(dateKey);

    if (record && getMetricValue(record) > 0) {
      lastKnown = record;
      result.push(record);
    } else if (lastKnown) {
      result.push({
        ...lastKnown,
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
  };

  if (timeframe === "Week") {
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      addRecord(date);
    }
  } else if (timeframe === "Month") {
    const year = start.getFullYear();
    const month = start.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      addRecord(date);
    }
  } else if (timeframe === "Year") {
    const year = start.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year, 11, 31);

    for (
      let date = new Date(startOfYear);
      date <= endOfYear;
      date.setDate(date.getDate() + 1)
    ) {
      addRecord(new Date(date)); // clone to avoid mutation
    }
  }

  return result;
}
