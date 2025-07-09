export async function updateWorkoutName(db: any, workoutId: number, newName: string): Promise<void> {
    const sql = `UPDATE workouts SET name = ? WHERE id = ?`;
    await db.runAsync(sql, [newName, workoutId]);
}