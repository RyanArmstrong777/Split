import { CompletedWorkout, Workout } from "../../../constants/types";

export async function getActiveCompletedWorkoutsForWeek(
	db: any,
	date: string,
	splitId: number
): Promise<(CompletedWorkout & Workout)[] | null> {
	try {
		const start = new Date(date);
		const end = new Date(start);
		end.setDate(start.getDate() + 6);

		const startDateStr = date;
		const endDateStr = end.toISOString().split("T")[0];

		const workouts = await db.getAllAsync(
			`SELECT
				cw.id AS id,
				cw.workout_id AS workoutId,
				cw.start_date AS startDate,
				w.split_id as splitId,
				w.name AS workoutName,
				w.day AS day
			FROM completed_workouts cw
			JOIN workouts w ON cw.workout_id = w.id
			WHERE cw.start_date BETWEEN ? AND ?
			AND w.split_id = ?`,
			[startDateStr, endDateStr, splitId]
		);

		if (!workouts || workouts.length === 0) return null;

		return workouts.map((workout: any) => ({
			id: workout.id,
			workoutId: workout.workoutId,
			startDate: workout.startDate,
			splitId: workout.splitId,
			name: workout.workoutName,
			day: workout.day,
		}));
	} catch (error) {
		console.error(error);
		return null;
	}
}
