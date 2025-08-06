export async function seedAppSettingsTable(db: any) {
    
    const result = await db.getFirstAsync('SELECT COUNT(*) AS count FROM app_settings');
    if (result.count === 0) {
        await db.runAsync(`
            INSERT INTO app_settings (theme, notifications_enabled, weight_unit, vibration_feedback, current_split_id, remove_ads)
            VALUES ('dark', 1, 'kg', 1, 1, 0);
        `);
    }
}