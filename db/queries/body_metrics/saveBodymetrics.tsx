import { SQLiteDatabase } from "expo-sqlite";

type BodyMetricsInput = {
    weight: number | null;
    bodyFatPercentage: number | null;
    BMI: number | null;
};

export async function saveBodymetrics(
    db: SQLiteDatabase,
    { weight, bodyFatPercentage, BMI }: BodyMetricsInput
): Promise<void> {
    if (weight == null && bodyFatPercentage == null && BMI == null) {
        return
    }

    const fields: string[] = [];
    const values: (number | null)[] = [];

    if (weight != null) {
        fields.push("weight");
        values.push(weight);
    }
    if (bodyFatPercentage != null) {
        fields.push("body_fat_percentage");
        values.push(bodyFatPercentage);
    }
    if (BMI != null) {
        fields.push("BMI");
        values.push(BMI);
    }

    const placeholders = fields.map(() => "?").join(", ");
    const query = `INSERT INTO body_metrics (${fields.join(", ")}) VALUES (${placeholders})`;

    await db.runAsync(query, values);
}
