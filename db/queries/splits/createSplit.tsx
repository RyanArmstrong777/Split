import { Split } from "../../../constants/types";

export async function createSplit(db: any, name: string): Promise<Split> {

    await db.runAsync("INSERT INTO splits (name) VALUES (?);", [name]);

    const newSplit = await db.getFirstAsync("SELECT * FROM splits WHERE id = last_insert_rowid();") as Split;

    return newSplit;
}