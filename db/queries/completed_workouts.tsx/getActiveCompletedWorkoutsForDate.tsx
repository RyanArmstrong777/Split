import { CompletedWorkout, Workout } from "@/constants/types";

export async function getActiveCompletedWorkoutForDate(
  db: any,
  date: string,
  splitId: number
): Promise<CompletedWorkout & Workout | null> {
  try {
    const workout = await db.getFirstAsync(
      `SELECT
        cw.id AS id,
        cw.workout_id AS workoutId,
        cw.start_date AS startDate,
        w.split_id as splitId,
        w.name AS workoutName,
        w.day AS day
      FROM completed_workouts cw
      JOIN workouts w ON cw.workout_id = w.id
      WHERE cw.start_date = ?
      AND w.split_id = ?`,
      [date, splitId]
    );

    if (!workout) return null;

    return {
      id: workout.id,
      workoutId: workout.workoutId,
      startDate: workout.startDate,
      splitId: workout.splitId,
      name: workout.workoutName,
      day: workout.day,
    };
  } catch (error) {
    console.log(error)
    return null;
  }
}