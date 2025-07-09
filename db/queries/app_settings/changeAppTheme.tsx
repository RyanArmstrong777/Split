export async function changeAppTheme(db: any, theme: "light" | "dark") {
    try {
        const row = await db.getFirstAsync(
            `SELECT id FROM app_settings ORDER BY id DESC LIMIT 1`
        ) as { id: number };
    if (row?.id) {
        await db.runAsync(`UPDATE app_settings SET color_theme = ? WHERE id = ?`, [theme, row.id]);
    } else {
        await db.runAsync(`INSERT INTO app_settings (color_theme) VALUES (?)`, [theme]);
    }
    } catch (error) {
        console.error('Failed to update color theme:', error);
    }
}