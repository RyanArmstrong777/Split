export default async function deleteTables(db: any) {
  await db.execAsync('PRAGMA foreign_keys = OFF');
  await db.execAsync('BEGIN TRANSACTION');

  try {

    const tables = await db.getAllAsync(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name != 'app_settings'"
    ) as { name: string }[];

    for (const table of tables) {
      await db.execAsync(`DROP TABLE IF EXISTS ${table.name}`);
    }

    await db.execAsync('COMMIT');
  } catch (error) {
    await db.execAsync('ROLLBACK');
    throw error;
  } finally {
    await db.execAsync('PRAGMA foreign_keys = ON');
  }
}