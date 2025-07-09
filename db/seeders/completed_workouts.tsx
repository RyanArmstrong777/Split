export async function seedCompletedWorkoutsTable(db: any) {
    const today = new Date();

    const monday = new Date(today);
    const currentDay = monday.getDay();
    const distance = (currentDay + 6) % 7;
    monday.setDate(monday.getDate() - distance);

    const workouts = await db.getAllAsync(`
        SELECT id, name, day
        FROM workouts
    `) as { id: number; name: string; day: number }[];

    for (const workout of workouts) {
        const workoutDate = new Date(monday);
        workoutDate.setDate(monday.getDate() + workout.day);
        const formattedDate = workoutDate.toISOString().split("T")[0];

        const existing = await db.getFirstAsync(
            `SELECT id FROM completed_workouts 
             WHERE start_date = ? AND workout_id = ?`,
            [formattedDate, workout.id]
        );

        if (!existing) {
            await db.runAsync(
                `INSERT INTO completed_workouts (workout_id, start_date)
                 VALUES (?, ?)`,
                [workout.id, formattedDate]
            );
        } else {
            console.log(`Completed workout already exists: ${formattedDate}, workout_id: ${workout.id}`);
        }
    }

}
