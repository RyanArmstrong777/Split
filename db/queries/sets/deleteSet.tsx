import { SQLiteDatabase } from "expo-sqlite";

export async function deleteSet(db: SQLiteDatabase, setId: number): Promise<void> {
  await db.runAsync(`DELETE FROM sets WHERE id = ?`, [setId]);
}