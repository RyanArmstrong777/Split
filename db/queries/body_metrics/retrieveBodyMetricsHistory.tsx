import { SQLiteDatabase } from 'expo-sqlite';
import { BodyMetrics } from '@/constants/types';

export async function retrieveBodyMetricsHistory(db: SQLiteDatabase): Promise<BodyMetrics[]> {
    const results = await db.getAllAsync(`SELECT * FROM body_metrics`);

    return results.map((row: any) => ({
        id: row.id,
        date: row.date,
        weight: row.weight,
        bodyFatPercentage: row.body_fat_percentage,
        BMI: row.BMI,
    }));
}
