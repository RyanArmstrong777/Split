import { SQLiteDatabase } from "expo-sqlite";
import { Split } from "../../../constants/types";

export function getActiveSplit(db: SQLiteDatabase): Promise<Split | null> {
  return new Promise((resolve, reject) => {
      db.getFirstAsync(
        `SELECT s.* FROM app_settings a JOIN splits s ON a.current_split_id = s.id WHERE a.id = 1;`,
        [],
      );
    });
}