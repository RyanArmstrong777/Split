import { SQLiteDatabase } from "expo-sqlite";
import { CompletedWorkout } from "../../../constants/types";

export async function createCompletedWorkout(db: SQLiteDatabase, workoutId: number, start_date: string): Promise<CompletedWorkout | null> {
    const query = `
        INSERT INTO completed_workouts (workout_id, start_date)
        VALUES (?, ?)
    `;

    try {
        await db.runAsync(query, [workoutId, start_date]);

        const newCompletedWorkout = await db.getFirstAsync(
            `SELECT * FROM completed_workouts WHERE id = last_insert_rowid()`
        ) as CompletedWorkout;

        return newCompletedWorkout;
    } catch (error) {
        console.log("Exercise already exists");
        return null;
    }
}