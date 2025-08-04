import { SQLiteDatabase } from "expo-sqlite";

export function removeAds(db: SQLiteDatabase) {
    db.execAsync(
      'UPDATE app_settings SET remove_ads =1'
    );
}
