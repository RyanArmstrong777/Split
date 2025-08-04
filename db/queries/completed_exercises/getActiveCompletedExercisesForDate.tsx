import { CompletedExercise } from "../../../constants/types";

export async function getActiveCompletedExercisesForDate(db: any, date: string, splitId: number): Promise<CompletedExercise[] | []> {
    try {

        const workout = await db.getFirstAsync(
            `SELECT cw.* 
            FROM completed_workouts cw
            JOIN workouts w ON cw.workout_id = w.id
            WHERE w.split_id = ? AND cw.start_date = ?
            LIMIT 1`,
            [splitId, date]
        );

        if (!workout) {
            return [];
        }

        const rawExercises = await db.getAllAsync(
            `SELECT 
                ce.id, 
                ce.name, 
                ce.rest_interval, 
                ce.completed_workout_id,
                (SELECT COUNT(*) 
                FROM completed_sets 
                WHERE completed_exercise_id = ce.id) as setsToBeCompleted,
                (SELECT COUNT(*) 
                FROM completed_sets 
                WHERE completed_exercise_id = ce.id AND completed = 1) as setsCompleted
            FROM completed_exercises ce
            WHERE ce.completed_workout_id = ?`,
            [workout.id]
        );

        const exercises: CompletedExercise[] = rawExercises.map((e: any) => ({
            id: e.id,
            name: e.name,
            restInterval: e.rest_interval,
            completedWorkoutId: e.completed_workout_id,
            setsToBeCompleted: e.setsToBeCompleted,
            setsCompleted: e.setsCompleted,
        }));

        return exercises;
    } catch (error) {
        console.error(`Failed to get workouts for split and date ${date}:`, error);
        throw error;
    }
}
