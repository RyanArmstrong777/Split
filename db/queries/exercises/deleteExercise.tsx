import { SQLiteDatabase } from "expo-sqlite";

export async function deleteExercise(db: SQLiteDatabase, exerciseId: number): Promise<void> {
    await db.runAsync(`DELETE FROM exercises WHERE id = ?`, [exerciseId]);
}