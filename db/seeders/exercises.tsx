import { exercises, workoutNameMap } from "../../constants/seeder_data";

export async function seedExercisesTable(db: any) {

  const workouts = await db.getAllAsync(`SELECT id, name FROM workouts`) as { id: number; name: string }[];

  for (const workout of workouts) {

    const exercisesForWorkout = exercises.filter(exercise => workoutNameMap[exercise.name] === workout.name);

    for (const exercise of exercisesForWorkout) {
      await db.runAsync(
        `INSERT OR IGNORE INTO exercises (name, rest_interval, workout_id) VALUES (?, ?, ?)`,
        [exercise.name, exercise.rest_interval, workout.id]
      );
    }
  }
}