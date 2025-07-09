export async function updateCompletedSet(
  db: any,
  completedSetId: number,
  updates: {
    targetWeight: number | null,
    weight: number | null,
    targetReps: number | null,
    reps: number | null,
    targetTime: number | null,
    time: number | null,
  }
): Promise<void> {
  try {
    await db.runAsync(
      `
      UPDATE completed_sets
      SET
        target_weight = ?,
        weight = ?,
        target_reps = ?,
        reps = ?,
        target_time = ?,
        time = ?
      WHERE id = ?
      `,
      [
        updates.targetWeight,
        updates.weight,
        updates.targetReps,
        updates.reps,
        updates.targetTime,
        updates.time,
        completedSetId
      ]
    );
  } catch (error) {
    console.error("Failed to update completed set:", error);
    throw error;
  }
}