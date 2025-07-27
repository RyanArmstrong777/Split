import { BodyMetrics } from '@/constants/types';

export async function getMostRecentBodyMetrics(db: any): Promise<BodyMetrics | null> {
    const record = await db.getFirstAsync(`SELECT * FROM body_metrics`) as BodyMetrics;

    if (!record) {
        return null;
    }
    
    return record;
};