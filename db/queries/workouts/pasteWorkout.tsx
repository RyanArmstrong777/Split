import { SQLiteDatabase } from "expo-sqlite";
import { createWorkout } from "./createWorkout";
import { pasteExercise } from "../exercises/pasteExercise";

export async function pasteWorkout(
    db: SQLiteDatabase,
    workoutId: number,
    splitId: number,
    day: number
) {
    const workout = await db.getFirstAsync(
        `SELECT name FROM workouts WHERE id = ?`,
        [workoutId]
    ) as { name: string };

    if (!workout) throw new Error("Workout not found");

    const newWorkout = await createWorkout({
        db,
        splitId,
        name: workout.name,
        day
    });

    const exercises = await db.getAllAsync(
        `SELECT id, name, rest_interval FROM exercises WHERE workout_id = ?`,
        [workoutId]
    ) as { id: number; name: string; rest_interval: number }[];

    for (const exercise of exercises) {
        await pasteExercise(db, exercise.id, newWorkout.id);
    }

    return newWorkout;
}