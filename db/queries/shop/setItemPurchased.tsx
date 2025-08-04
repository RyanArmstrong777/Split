import { seedArnoldSplit } from '../../../db/seeders/shop_products/ArnoldSchwarzenegger';
import { seedChrisBumsteadSplit } from '../../../db/seeders/shop_products/ChrisBumstead';
import { seedDavidLaidSplit } from '../../../db/seeders/shop_products/DavidLaid';
import { seedGregDoucetteSplit } from '../../../db/seeders/shop_products/GregDoucette';
import { seedJeffCavaliereSplit } from '../../../db/seeders/shop_products/JeffCavaliere';
import { seedJeffNippardSplit } from '../../../db/seeders/shop_products/JeffNippard';
import { seedJeremyEthierSplit } from '../../../db/seeders/shop_products/JeremyEthier';
import { seedNickWalkerSplit } from '../../../db/seeders/shop_products/NickWalker';
import { seedOmarIsufSplit } from '../../../db/seeders/shop_products/OmarIsuf';
import { seedSamSulekSplit } from '../../../db/seeders/shop_products/SamSulek';
import { seedSeanNalewanyjSplit } from '../../../db/seeders/shop_products/SeanNalewanyj';
import { seedSimeonPandaSplit } from '../../../db/seeders/shop_products/SimeonPanda';

export const seeders: Record<string, (db: any) => Promise<void>> = {
    seedArnoldSplit,
    seedChrisBumsteadSplit,
    seedDavidLaidSplit,
    seedGregDoucetteSplit,
    seedJeffCavaliereSplit,
    seedJeffNippardSplit,
    seedJeremyEthierSplit,
    seedNickWalkerSplit,
    seedOmarIsufSplit,
    seedSamSulekSplit,
    seedSeanNalewanyjSplit,
    seedSimeonPandaSplit,
};

export async function setItemPurchased(db: any, itemId: number) {
    const updateSql = `UPDATE shop_products SET purchased = 1 WHERE id = ?;`;
    await db.runAsync(updateSql, [itemId]);

    const selectSql = `SELECT * FROM shop_products WHERE id = ?;`;
    const item = await db.getFirstAsync(selectSql, [itemId]);

    if (!item) {
        throw new Error(`No shop product found with id ${itemId}`);
    }

    const seederFunction = seeders[item.seeder];

    if (typeof seederFunction === 'function') {
        console.log(`Running seeder: ${item.seeder}`);
        seederFunction(db);
    } else {
        console.warn(`No seeder function found for key: ${item.seeder}`);
    }
}
