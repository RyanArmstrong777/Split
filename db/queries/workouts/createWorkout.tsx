import { SQLiteDatabase } from "expo-sqlite";

type props = {
    db: SQLiteDatabase
    splitId: number
    name: string
    day: number
}

export async function createWorkout({
    db,
    splitId,
    name,
    day
}: props) {
    await db.runAsync(
        `INSERT INTO workouts (split_id, name, day) VALUES (?, ?, ?);`,
        [splitId, name, day]
    );

    const newWorkout = await db.getFirstAsync(
        `SELECT * FROM workouts WHERE rowid = last_insert_rowid();`
    ) as {
        id: number;
        split_id: number;
        name: string;
        day: number;
    };

    return newWorkout;
}