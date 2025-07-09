export async function seedSplitWorkoutsTable(db: any) {

    const splitId = 1;

    const workouts = await db.getAllAsync(
        `SELECT id, name FROM workouts WHERE name IN (?, ?, ?)`,
        ['Push day', 'Pull day', 'Leg day']
    );

    for (const workout of workouts) {
        await db.runAsync(
            `INSERT OR IGNORE INTO split_workouts (split_id, workout_id) VALUES (?, ?)`,
            [splitId, workout.id]
        );
    }
    
}