import { Exercise } from "@/constants/types";

export async function getExercisesByWorkoutId(db: any, workoutId: number): Promise<Exercise[]> {

    const exercises = await db.getAllAsync(
        `SELECT * FROM exercises WHERE workout_id = ?`, [workoutId],
    );

    return exercises as Exercise[];
}