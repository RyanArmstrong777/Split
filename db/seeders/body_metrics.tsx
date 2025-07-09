export async function seedBodyMetricsTable(db: any) {

    const result = await db.getFirstAsync(`SELECT COUNT(*) as count FROM body_metrics;`);
    
    if (result?.count === 0) {
        await db.runAsync(`
            INSERT INTO body_metrics (
                date,
                weight,
                body_fat_percentage,
                BMI
            ) VALUES (
                date('now'),
                72.5,
                18.5,
                23.1
            )
        `);
    }
}