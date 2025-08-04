import { SQLiteDatabase } from "expo-sqlite";
import { Set } from "../../../constants/types";

type Params = {
    db: SQLiteDatabase;
    exerciseId: number;
    targetWeight?: number | null;
    targetReps?: number | null;
    targetTime?: number | null;
    order: number
};

export async function createSet({
    db,
    exerciseId,
    targetWeight = null,
    targetReps = null,
    targetTime = null,
    order,
}: Params): Promise<Set> {

    await db.runAsync(
        `INSERT INTO sets (exercise_id, weight, reps, time, \'order'\) VALUES (?, ?, ?, ?, ?)`,
        [exerciseId, targetWeight, targetReps, targetTime, order]
    );

    const result = await db.getFirstAsync(
        `SELECT * FROM sets WHERE id = last_insert_rowid()`
    ) as Set;

    return result;
}