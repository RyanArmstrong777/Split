import { CompletedSet } from "@/constants/types";

type props = {
    sets: CompletedSet[];
};

export async function getActiveCompletedSets(db: any, completedExerciseId: number): Promise<props> {
    const result = await db.getFirstAsync(
        `SELECT 
            (SELECT json_group_array(json_object(
                'id', completed_sets.id,
                'completedExerciseId', completed_sets.completed_exercise_id,
                'targetWeight', completed_sets.target_weight,
                'weight', completed_sets.weight,
                'reps', completed_sets.reps,
                'targetReps', completed_sets.target_reps,
                'time', completed_sets.time,
                'targetTime', completed_sets.target_time,
                'order', completed_sets.\`order\`,
                'completed', completed_sets.completed
            )) FROM completed_sets WHERE completed_sets.completed_exercise_id = ?) as sets_json
        `,
        [completedExerciseId]
    );

    return {
        sets: result?.sets_json ? JSON.parse(result.sets_json) : [],
    };
}