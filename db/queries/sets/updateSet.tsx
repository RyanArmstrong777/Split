import { SQLiteDatabase } from "expo-sqlite";

type UpdateSetParams = {
  db: SQLiteDatabase;
  setId: number;
  weight?: number | null;
  reps?: number | null;
  time?: number | null;
};

export async function updateSet({ db, setId, weight, reps, time }: UpdateSetParams): Promise<void> {
    const fields: string[] = [];
    const values: any[] = [];

    if (weight !== undefined) {
        fields.push("weight = ?");
        values.push(weight);
    }

    if (reps !== undefined) {
        fields.push("reps = ?");
        values.push(reps);
    }

    if (time !== undefined) {
        fields.push("time = ?");
        values.push(time);
    }

    if (fields.length === 0) {
        console.warn("No fields to update.");
        return;
    }

    values.push(setId);

    const query = `UPDATE sets SET ${fields.join(", ")} WHERE id = ?`;

    await db.runAsync(query, values);
}