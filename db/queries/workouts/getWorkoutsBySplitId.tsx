import { SQLiteDatabase } from "expo-sqlite";
import { getWeek } from "@/utilities/getWeek";
import { Workout } from "@/constants/types";

export async function getWorkoutsBySplitId(db: SQLiteDatabase, splitId: number): Promise<Workout[]> {

    const query = `
        SELECT * FROM workouts
        WHERE split_id = ?
    `;

    try {
        const workouts = await db.getAllAsync(query, [splitId]) as Workout[];
        return workouts;
    } catch (error) {
        console.error('Error fetching workouts by splitId:', error);
        throw error;
    }
}
