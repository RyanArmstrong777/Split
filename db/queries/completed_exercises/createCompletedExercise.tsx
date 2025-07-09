import { CompletedExercise } from "@/constants/types";

type CreateCompletedExerciseParams = {
  name: string;
  restInterval: number | null;
  completedWorkoutId: number;
};

export async function createCompletedExercise(db: any, { name, restInterval, completedWorkoutId }: CreateCompletedExerciseParams): Promise<CompletedExercise> {
  const sql = `
    INSERT INTO completed_exercises (name, rest_interval, completed_workout_id)
    VALUES (?, ?, ?);
  `;

  await db.runAsync(sql, [name, restInterval, completedWorkoutId]);

  const result = await db.getFirstAsync(
    `SELECT * FROM completed_sets WHERE id = last_insert_rowid()`
  );

  return result;

}
