import { Split } from '@/constants/types';
import { SQLiteDatabase } from 'expo-sqlite';

export async function getAllSplits(db: SQLiteDatabase): Promise<Split[]> {
    try {
        const results = await db.getAllAsync(
            'SELECT * FROM splits ORDER BY id ASC;'
        ) as Split[];
        return results;
    } catch (error) {
        console.error('Error fetching splits:', error);
        return [];
    }
}