import { exercises, workoutNameMap } from "@/constants/seeder_data";
import { CompletedWorkout } from "@/constants/types";
import { getLastMonday } from "@/utilities/getLastMonday";

type CompletedWorkoutWithName = {
    id: number;
    workout_id: number;
    name: string;
    start_date: string;
};

export async function seedCompletedExercisesTable(db: any) {
    try {

        const monday = getLastMonday();
        const sunday = new Date();
        sunday.setDate(sunday.getDate() + (6 - sunday.getDay()));
        const sundayStr = sunday.toISOString().split('T')[0];

        const workouts = await db.getAllAsync(`
            SELECT 
                completed_workouts.id,
                completed_workouts.workout_id,
                workouts.name,
                completed_workouts.start_date
            FROM completed_workouts
            JOIN workouts ON completed_workouts.workout_id = workouts.id
            WHERE completed_workouts.start_date BETWEEN ? AND ?
            ORDER BY completed_workouts.start_date ASC
        `, [monday, sundayStr]) as CompletedWorkoutWithName[];

        for (const workout of workouts) {

            const workoutType = workout.name;
            const workoutExercises = exercises.filter(ex => 
                workoutNameMap[ex.name] === workoutType
            );

            for (const exercise of workoutExercises) {
                await db.runAsync(`
                    INSERT INTO completed_exercises (
                        name, 
                        rest_interval, 
                        completed_workout_id
                    ) VALUES (?, ?, ?)
                `, [
                    exercise.name,
                    exercise.rest_interval,
                    workout.id
                ]);
            }

        }
    } catch (error) {
        throw error;
    }

}