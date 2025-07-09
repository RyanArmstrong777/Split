import { SQLiteDatabase } from "expo-sqlite";
import { createExercise } from "./createExercise";
import { createSet } from "../sets/createSet";
import { getSetsByExerciseId } from "../sets/getSetsByExerciseId";

export async function pasteExercise(
    db: SQLiteDatabase,
    exerciseId: number,
    targetWorkoutId: number
) {
    const exercise = await db.getFirstAsync(
        `SELECT name, rest_interval FROM exercises WHERE id = ?`,
        [exerciseId]
    ) as { name: string; rest_interval: number };

    if (!exercise) throw new Error("Exercise not found");

    const newExercise = await createExercise(
        db,
        targetWorkoutId,
        exercise.name,
        exercise.rest_interval
    );

    const sets = await getSetsByExerciseId(db, exerciseId)

    for (const set of sets) {
        await createSet({
            db,
            exerciseId: newExercise.id,
            targetWeight: set.weight,
            targetReps: set.reps,
            targetTime: set.time,
            order: set.order
        });
    }

    return newExercise;
}
