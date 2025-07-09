export async function seedSplitsTable(db: any) {

    await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        ["Default PPL", "Push, Pull, Legs - 6 day split"]
    );

}