export async function isSeeded(db: any): Promise<boolean> {
    const row = await db.getFirstAsync(`SELECT value FROM meta WHERE key = 'seeded' LIMIT 1`);
    return row?.value === 'true';
}