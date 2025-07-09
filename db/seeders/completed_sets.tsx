import { CompletedExercise } from "@/constants/types";
import { exerciseSetConfigs } from "@/constants/seeder_data";

export async function seedCompletedSetsTable(db: any) {
    try {

        const completedExercises = await db.getAllAsync(`
            SELECT id, name, completed_workout_id 
            FROM completed_exercises
        `) as CompletedExercise[];

        for (const exercise of completedExercises) {
            const setConfig = exerciseSetConfigs[exercise.name];
            
            if (!setConfig) {
                continue;
            }

            for (let i = 0; i < setConfig.length; i++) {
                const set = setConfig[i];
                await db.runAsync(`
                    INSERT INTO completed_sets (
                        target_weight,
                        weight,
                        target_reps,
                        reps,
                        target_time,
                        time,
                        completed,
                        \`order\`,
                        completed_exercise_id
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `, [
                    set.weight,
                    null,
                    set.reps,
                    null,
                    set.time,
                    null,
                    0,
                    i + 1,
                    exercise.id
                ]);
            }

        }
    } catch (error) {
        throw error;
    }
}