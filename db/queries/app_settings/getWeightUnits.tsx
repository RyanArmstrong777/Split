export async function getWeightUnits(db: any): Promise<string> {

    const result = await db.getFirstAsync(`
        SELECT weight_unit FROM app_settings
        ORDER BY id DESC
        LIMIT 1
    `);

    return result ? result.weight_unit : '';
}