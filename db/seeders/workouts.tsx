export async function seedWorkoutsTable(db: any) {
    const splitId = 1;
    const workoutNames = ["Push day", "Pull day", "Leg day", "Push day", "Pull day", "Leg day"];
    const days = [0, 1, 2, 3, 4, 5];

    for (let i = 0; i < 6; i++) {
        await db.runAsync(
            `INSERT INTO workouts (split_id, name, day) VALUES (?, ?, ?)`,
            [splitId, workoutNames[i], days[i]]
        );
    }

}