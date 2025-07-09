import { AppSettings } from "@/constants/types";

function toSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export async function updateAppSettings(db: any, updates: Partial<AppSettings>) {
    const columns = Object.keys(updates);
    const values = Object.values(updates);

    const setClause = columns.map((col) => `${toSnakeCase(col)} = ?`).join(', ');

    const sql = `UPDATE app_settings SET ${setClause} WHERE id = 1;`;

    await db.runAsync(sql, values);
}