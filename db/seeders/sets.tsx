import { exerciseSetConfigs } from "@/constants/seeder_data";

export async function seedSetsTable(db: any) {

    const allExercises = await db.getAllAsync('SELECT id, name FROM exercises');

    for (const exercise of allExercises) {
        const sets = exerciseSetConfigs[exercise.name];
        if (sets) {
            for (let i = 0; i < sets.length; i++) {
                const set = sets[i];
                await db.runAsync(
                    `INSERT INTO sets (exercise_id, weight, reps, \`order\`) VALUES (?, ?, ?, ?)`,
                    [exercise.id, set.weight || null, set.reps || null, i + 1]
                );
            }
        }
    }
}