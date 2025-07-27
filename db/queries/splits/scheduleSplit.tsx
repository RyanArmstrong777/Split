import { getLastMonday } from "@/utilities/getLastMonday";
import { format, addDays } from "date-fns";

export async function scheduleSplit(db: any, splitId: number, day: number): Promise<void> {
	try {
		const lastMonday = new Date(getLastMonday());

		const workouts = await db.getAllAsync(
			`SELECT * FROM workouts WHERE split_id = ? AND day >= ? ORDER BY day ASC`,
			[splitId, day]
		);

		for (const workout of workouts) {
			const workoutDate = format(addDays(lastMonday, workout.day), "yyyy-MM-dd");

			const { lastInsertRowId: completedWorkoutId } = await db.runAsync(
				`INSERT INTO completed_workouts (workout_id, start_date) VALUES (?, ?)`,
				[workout.id, workoutDate]
			);

			const exercises = await db.getAllAsync(
				`SELECT * FROM exercises WHERE workout_id = ? ORDER BY id`,
				[workout.id]
			);

			for (const exercise of exercises) {

				const { lastInsertRowId: completedExerciseId } = await db.runAsync(
					`INSERT INTO completed_exercises (name, rest_interval, completed_workout_id) VALUES (?, ?, ?)`,
					[exercise.name, exercise.rest_interval, completedWorkoutId]
				);
				const sets = await db.getAllAsync(
					`SELECT * FROM sets WHERE exercise_id = ? ORDER BY \`order\` ASC`,
					[exercise.id]
				);

				for (const set of sets) {
					await db.runAsync(
						`INSERT INTO completed_sets (
							completed_exercise_id,
							target_weight,
							target_reps,
							target_time,
							weight,
							reps,
							time,
							\`order\`
						) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
						[
							completedExerciseId,
							set.weight,
							set.reps,
							set.time,
							null,
							null,
							null,
							set.order
						]
					);
				}
			}
		}
	} catch (error) {
		console.error("Error scheduling split:", error);
		throw error;
	}
}
