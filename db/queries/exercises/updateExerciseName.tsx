export async function updateExerciseName(db: any, exerciseId: number, newName: string): Promise<void> {
    const sql = `UPDATE exercises SET name = ? WHERE id = ?`;
    await db.runAsync(sql, [newName, exerciseId]);
}