import { SQLiteDatabase } from "expo-sqlite";
import { Exercise } from "../../../constants/types";

export async function createExercise(db: SQLiteDatabase, workoutId: number, name: string, restInterval: number): Promise<Exercise> {

    await db.runAsync(`INSERT INTO exercises (workout_id, name, rest_interval) VALUES (?, ?, ?)`, [workoutId, name, restInterval]);

    const result = await db.getFirstAsync(`SELECT * FROM exercises WHERE id = last_insert_rowid()`) as Exercise;

    return result;
}