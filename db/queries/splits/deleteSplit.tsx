import { SQLiteDatabase } from "expo-sqlite";

export async function deleteSplit(db: SQLiteDatabase, splitId: number) {
    await db.runAsync( `DELETE FROM splits WHERE id = ?;`, [splitId] );
}