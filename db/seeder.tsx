import { createTables } from "./schema";
import { seedSplitsTable } from "./seeders/splits";
import { seedWorkoutsTable } from "./seeders/workouts";
import { seedCompletedWorkoutsTable } from "./seeders/completed_workouts";
import { seedExercisesTable } from "./seeders/exercises";
import { seedCompletedExercisesTable } from "./seeders/completed_exercises";
import { seedSetsTable } from "./seeders/sets";
import { seedCompletedSetsTable } from "./seeders/completed_sets";
import { seedBodyMetricsTable } from "./seeders/body_metrics";
import { isSeeded } from "./queries/meta/isSeeded";
import { setSeeded } from "./queries/meta/setSeeded";
import { seedAppSettingsTable } from "./seeders/app_settings";
import deleteTables from "./utilities/deleteTables";
import { seedArnoldSplit } from "./seeders/shop_products/ArnoldSchwarzenegger";
import { seedChrisBumsteadSplit } from "./seeders/shop_products/ChrisBumstead";
import { seedNickWalkerSplit } from "./seeders/shop_products/NickWalker";
import { seedJeffCavaliereSplit } from "./seeders/shop_products/JeffCavaliere";
import { seedJeffNippardSplit } from "./seeders/shop_products/JeffNippard";
import { seedJeremyEthierSplit } from "./seeders/shop_products/JeremyEthier";
import { seedOmarIsufSplit } from "./seeders/shop_products/OmarIsuf";
import { seedSeanNalewanyjSplit } from "./seeders/shop_products/SeanNalewanyj";
import { seedSamSulekSplit } from "./seeders/shop_products/SamSulek";
import { seedDavidLaidSplit } from "./seeders/shop_products/DavidLaid";
import { seedSimeonPandaSplit } from "./seeders/shop_products/SimeonPanda";
import { seedGregDoucetteSplit } from "./seeders/shop_products/GregDoucette";
import { seedShopProducts } from "./seeders/shop_products";

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
            await db.runAsync(`UPDATE app_settings SET current_split_id = ? WHERE id = 1`, [1]);

            await seedWorkoutsTable(db);
            await seedExercisesTable(db);
            await seedSetsTable(db);

            await seedCompletedWorkoutsTable(db);
            await seedCompletedExercisesTable(db);
            await seedCompletedSetsTable(db);

            await seedBodyMetricsTable(db);

            await seedShopProducts(db);

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