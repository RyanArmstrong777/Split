type CompleteSetParams = {
    db: any;
    id: number;
    weight?: number;
    reps?: number;
    time?: number;
};

export async function completeSet({ db, id, weight, reps, time }: CompleteSetParams): Promise<void> {
    try {

        let query = `UPDATE completed_sets SET completed = 1`;
        const params: any[] = [];
        
        if (weight !== undefined) {
            query += `, weight = ?`;
            params.push(weight);
        }
        if (reps !== undefined) {
            query += `, reps = ?`;
            params.push(reps);
        }
        if (time !== undefined) {
            query += `, time = ?`;
            params.push(time);
        }
        
        query += ` WHERE id = ?`;
        params.push(id);

        await db.runAsync(query, params);

    } catch (error) {
        console.error(`Failed to complete set ${id}:`, error);
        throw error;
    }
}