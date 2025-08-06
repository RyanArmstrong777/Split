import { isSeeded } from "./queries/meta/isSeeded";
import { setSeeded } from "./queries/meta/setSeeded";
import { createTables } from "./schema";
import { seedAppSettingsTable } from "./seeders/app_settings";
import { seedBodyMetricsTable } from "./seeders/body_metrics";
import { seedCompletedExercisesTable } from "./seeders/completed_exercises";
import { seedCompletedSetsTable } from "./seeders/completed_sets";
import { seedCompletedWorkoutsTable } from "./seeders/completed_workouts";
import { seedExercisesTable } from "./seeders/exercises";
import { seedSetsTable } from "./seeders/sets";
import { seedSplitsTable } from "./seeders/splits";
import { seedWorkoutsTable } from "./seeders/workouts";

export default async function runSeeder(db: any) {

    let transactionStarted = false;

    try {

        await createTables(db);

        if (!await isSeeded(db)) {

            await db.execAsync('PRAGMA foreign_keys=ON');
            await db.execAsync('BEGIN TRANSACTION');

            transactionStarted = true;

            await db.execAsync(`DELETE FROM sqlite_sequence;`);
            
            await seedSplitsTable(db);

            await seedAppSettingsTable(db);

            await seedWorkoutsTable(db);
            await seedExercisesTable(db);
            await seedSetsTable(db);

            await seedCompletedWorkoutsTable(db);
            await seedCompletedExercisesTable(db);
            await seedCompletedSetsTable(db);

            await seedBodyMetricsTable(db);

            await setSeeded(db)
            
            await db.execAsync('COMMIT');
        }

    } catch (error) {
        try {
            if (transactionStarted) {
                await db.execAsync('ROLLBACK');
            }
        } catch (rollbackError) {
            console.error("Rollback failed:", rollbackError);
        }
        throw error;
    }
}