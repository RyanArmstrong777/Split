import { CompletedSet } from "@/constants/types";

type CreateCompletedSetParams = {
  completedExerciseId: number;
  order: number;
  targetWeight?: number | null;
  weight?: number | null;
  targetReps?: number | null;
  reps?: number | null;
  targetTime?: number | null;
  time?: number | null;
  completed?: number | null;
};

export async function createCompletedSet(
  db: any,
  params: CreateCompletedSetParams
): Promise<CompletedSet> {
  const {
    completedExerciseId,
    order,
    targetWeight = null,
    weight = null,
    targetReps = null,
    reps = null,
    targetTime = null,
    time = null,
    completed = 0,
  } = params;

  await db.runAsync(
    `INSERT INTO completed_sets
      (completed_exercise_id, target_weight, weight, target_reps, reps, target_time, time, completed, \`order\`)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [completedExerciseId, targetWeight, weight, targetReps, reps, targetTime, time, completed, order]
  );

  const newSet = await db.getFirstAsync(
    `SELECT * FROM completed_sets WHERE id = last_insert_rowid()`
  );

  return newSet;
}
