import { useSQLiteContext } from 'expo-sqlite';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Split } from '../constants/types';
import { createCompletedExercise } from '../db/queries/completed_exercises/createCompletedExercise';
import { createCompletedSet } from '../db/queries/completed_sets/createCompletedSet';
import { createCompletedWorkout } from '../db/queries/completed_workouts.tsx/createCompletedWorkout';
import { getExercisesByWorkoutId } from '../db/queries/exercises/getExercisesByWorkoutId';
import { getSetsByExerciseId } from '../db/queries/sets/getSetsByExerciseId';
import { getAllSplits } from '../db/queries/splits/getAllSplits';
import { updateSplitName } from '../db/queries/splits/updateSplitName';
import { getWorkoutsBySplitId } from '../db/queries/workouts/getWorkoutsBySplitId';
import { getLastMonday } from '../utilities/getLastMonday';
import { useAppSettingsContext } from './appSettingsContext';

interface SplitContextProps {
  split: Split | null;
  changeSplit: (splitId: number) => Promise<void>;
  updateName: (splitId: number, splitName: string) => Promise<void>;
  splits: Split[] | null;
  refreshSplits: boolean;
  setRefreshSplits: React.Dispatch<React.SetStateAction<boolean>>;
}

const SplitContext = createContext<SplitContextProps | null>(null);

interface SplitProviderProps {
  children: ReactNode;
}

export const SplitProvider = ({ children }: SplitProviderProps) => {

    const db = useSQLiteContext();
    const { refreshKey } = useAppSettingsContext();
    const [split, setSplit] = useState<Split | null>(null);

    const [splits, setSplits] = useState<Split[] | null>(null)
    const [refreshSplits, setRefreshSplits] = useState(false);

    const loadSplit = async () => {
        if (!db) return;
        const result = await db.getFirstAsync(`
            SELECT 
            a.current_split_id AS id,
            s.name
            FROM 
            app_settings a
            JOIN 
            splits s ON a.current_split_id = s.id
            WHERE 
            a.id = 1
            LIMIT 1;
        `);

        if (result) {
            setSplit(result as Split | null);
        } else {
            setSplit(null);
        }
    };

    const getSplits = async () => {
        const result = await getAllSplits(db)
        setSplits(result)
    }

    const changeSplit = async (splitId: number) => {
        await db.runAsync(`UPDATE app_settings SET current_split_id = ?`, [splitId]);
        const monday = new Date(getLastMonday())
        const workouts = await getWorkoutsBySplitId(db, splitId)
        for (const workout of workouts) {
            const workoutDate = new Date(monday);
            workoutDate.setDate(monday.getDate() + (workout.day));

            const start_date = workoutDate.toISOString().slice(0, 10);;

            try {
                const completedWorkout = await createCompletedWorkout(db, workout.id, start_date);
                const exercises = await getExercisesByWorkoutId(db, workout.id)
                for (const exercise of exercises) {
                    if (completedWorkout) {
                        const completedExercise = await createCompletedExercise(db, { name: exercise.name, restInterval: exercise.restInterval, completedWorkoutId: completedWorkout.id})
                        const sets = await getSetsByExerciseId(db, exercise.id)
                        for (const set of sets) {
                            await createCompletedSet(db, { completedExerciseId: completedExercise.id, order: set.order, targetWeight: set.weight, targetReps: set.reps, targetTime: set.time })
                        }
                    }
                }
            } catch (error) {
                console.error(`Failed to create completed workout for workout ID ${workout.id}:`, error);
            }
        }
        loadSplit()
    };

    const updateName = async (splitId: number, splitName: string) => {
        await updateSplitName(db, splitId, splitName);
        getSplits()
    }

    useEffect(() => {
        if (!db) return;
        loadSplit();
        getSplits();
    }, [refreshKey, refreshSplits]);

    return (
        <SplitContext.Provider value={{ split, changeSplit, updateName, splits, refreshSplits, setRefreshSplits }}>
            {children}
        </SplitContext.Provider>
    );
};

export const useSplitContext = () => {
  const context = useContext(SplitContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};