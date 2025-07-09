export async function deleteCompletedSet(db: any, completedSetId: number): Promise<void> {
    try {
        await db.runAsync(
            `DELETE FROM completed_sets WHERE id = ?`,
            [completedSetId]
        );
    } catch (error) {
        console.error("Failed to delete completed set:", error);
        throw error;
    }
}