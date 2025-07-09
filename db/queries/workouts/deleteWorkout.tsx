import { SQLiteDatabase } from "expo-sqlite";

export async function deleteWorkout(db: SQLiteDatabase, workoutId: number): Promise<void> {
  await db.runAsync(`DELETE FROM workouts WHERE id = ?`, [workoutId]);
}