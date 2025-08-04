import { Set } from "../../../constants/types";

export async function getSetsByExerciseId(db: any, exerciseId: number): Promise<Set[]> {
    const rows: Set[] = await db.getAllAsync(
        `SELECT * FROM sets WHERE exercise_id = ?`,
        [exerciseId]
    );

    return rows;
}