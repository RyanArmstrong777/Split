import { Workout } from "@/constants/types";

export async function getWorkoutsOnDay(db: any, split_id: number, day: number): Promise<Workout[]> {

    const workouts = await db.getAllAsync(
        `SELECT * FROM workouts WHERE split_id = ? AND day = ?`,
        [split_id, day]
    );

    return workouts as Workout[]
}