import {
    CompletedExercise
} from "@/constants/types";

export type CompletedExerciseWithDate = CompletedExercise & {
    startDate: string;
    volume: number;
};

export async function getCompletedExercisesWithStartDate(
    db: any
): Promise<CompletedExerciseWithDate[]> {
    const completedExercises = await db.getAllAsync(
        `SELECT ce.*, cw.start_date 
         FROM completed_exercises ce
         JOIN completed_workouts cw ON ce.completed_workout_id = cw.id`
    ) as (CompletedExercise & { start_date: string })[];

    if (!completedExercises.length) return [];

    const exerciseIds = completedExercises.map(ex => ex.id);
    const placeholders = exerciseIds.map(() => '?').join(',');

    const completedSets = await db.getAllAsync(
        `SELECT weight, reps, completed_exercise_id 
         FROM completed_sets 
         WHERE completed_exercise_id IN (${placeholders})`,
        exerciseIds
    ) as {
        completed_exercise_id: number;
        weight: number;
        reps: number;
    }[];

    const volumeByExerciseId = new Map<number, number>();
    completedSets.forEach(set => {
        const volume = set.weight * set.reps;
        const currentVolume = volumeByExerciseId.get(set.completed_exercise_id) || 0;
        volumeByExerciseId.set(set.completed_exercise_id, currentVolume + volume);
    });

    return completedExercises.map((exercise) => ({
        ...exercise,
        startDate: exercise.start_date,
        volume: volumeByExerciseId.get(exercise.id) || 0
    }));
}
