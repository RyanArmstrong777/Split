export async function updateSplitName(db: any, id: number, name: string): Promise<void> {
  try {
    await db.runAsync('UPDATE splits SET name = ? WHERE id = ?', [name, id]);
  } catch (error) {
    console.error('Failed to update split name:', error);
    throw error;
  }
}