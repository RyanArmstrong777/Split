export async function getWorkoutNameForDate(db: any, date: string): Promise<string> {
    try {

        const CompletedWorkout = await db.getFirstAsync(
        `SELECT workout_id FROM completed_workouts WHERE start_date = ?;`,
        [date]
        ) as { workout_id: number };

        if (!CompletedWorkout || !CompletedWorkout.workout_id) {
            return "Rest day";
        }

        const workoutId = CompletedWorkout.workout_id;

        const workout = await db.getFirstAsync(
            `SELECT name FROM workouts WHERE id = ?;`,
            [workoutId]
        ) as { name: string };

        return workout?.name || "";
    } catch (error) {
        console.log("Error in getWorkoutName:", error);
        return "";
    }
}