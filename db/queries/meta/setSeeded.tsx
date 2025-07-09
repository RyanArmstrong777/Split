export async function setSeeded(db: any): Promise<void> {
    await db.runAsync(`INSERT OR REPLACE INTO meta (key, value) VALUES ('seeded', 'true')`);
}