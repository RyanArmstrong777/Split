import { Set } from "./types";

export const exercises = [

    { name: 'Chest Press', rest_interval: 90 },
    { name: 'Incline Dumbbell Press', rest_interval: 90 },
    { name: 'Cable Fly', rest_interval: 90 },
    { name: 'Push-ups', rest_interval: 90 },

    { name: 'Skull Crushers', rest_interval: 90 },
    { name: 'Tricep Dips', rest_interval: 90 },
    { name: 'Tricep Pushdown', rest_interval: 90 },
    { name: 'Overhead Tricep Extension', rest_interval: 90 },

    { name: 'Lat Pull-Down', rest_interval: 90 },
    { name: 'Deadlifts', rest_interval: 90 },
    { name: 'Seated Row', rest_interval: 90 },
    { name: 'Pull-Ups', rest_interval: 90 },

    { name: 'Preacher Curls', rest_interval: 90 },
    { name: 'Barbell Curls', rest_interval: 90 },
    { name: 'Hammer Curls', rest_interval: 90 },
    { name: 'Concentration Curls', rest_interval: 90 },

    { name: 'Squats', rest_interval: 90 },
    { name: 'Leg Press', rest_interval: 90 },
    { name: 'Lunges', rest_interval: 90 },
    { name: 'Leg Curls', rest_interval: 90 },

    { name: 'Rear Delt Flies', rest_interval: 90 },
    { name: 'Overhead Press', rest_interval: 90 },
    { name: 'Lateral Raises', rest_interval: 90 },
    { name: 'Front Raises', rest_interval: 90 },

];

export const workoutNameMap: Record<string, string> = {

    'Chest Press': 'Push day',
    'Incline Dumbbell Press': 'Push day',
    'Cable Fly': 'Push day',
    'Push-ups': 'Push day',
    'Skull Crushers': 'Push day',
    'Tricep Dips': 'Push day',
    'Tricep Pushdown': 'Push day',
    'Overhead Tricep Extension': 'Push day',

    'Lat Pull-Down': 'Pull day',
    'Deadlifts': 'Pull day',
    'Seated Row': 'Pull day',
    'Pull-Ups': 'Pull day',
    'Preacher Curls': 'Pull day',
    'Barbell Curls': 'Pull day',
    'Hammer Curls': 'Pull day',
    'Concentration Curls': 'Pull day',

    'Squats': 'Leg day',
    'Leg Press': 'Leg day',
    'Lunges': 'Leg day',
    'Leg Curls': 'Leg day',
    'Rear Delt Flies': 'Leg day',
    'Overhead Press': 'Leg day',
    'Lateral Raises': 'Leg day',
    'Front Raises': 'Leg day',

};

export const exerciseSetConfigs: Record<string, Set[]> = {

    'Chest Press': Array(4).fill({ weight: 20, reps: 10 }),
    'Incline Dumbbell Press': Array(4).fill({ weight: 20, reps: 10 }),
    'Cable Fly': Array(3).fill({ weight: 10, reps: 12 }),
    'Push-ups': Array(4).fill({ reps: 10 }),
    'Skull Crushers': Array(3).fill({ weight: 20, reps: 12 }),
    'Tricep Dips': Array(4).fill({ reps: 6 }),
    'Tricep Pushdown': Array(3).fill({ weight: 14, reps: 12 }),
    'Overhead Tricep Extension': Array(3).fill({ weight: 26, reps: 12 }),
    'Lat Pull-Down': Array(3).fill({ weight: 52, reps: 12 }),
    'Deadlifts': Array(4).fill({ weight: 70, reps: 6 }),
    'Seated Row': Array(3).fill({ weight: 36, reps: 12 }),
    'Pull-Ups': Array(4).fill({ reps: 6 }),
    'Preacher Curls': Array(3).fill({ weight: 15, reps: 10 }),
    'Barbell Curls': Array(3).fill({ weight: 20, reps: 12 }),
    'Hammer Curls': Array(3).fill({ weight: 8, reps: 12 }),
    'Concentration Curls': Array(3).fill({ weight: 8, reps: 12 }),
    'Squats': Array(4).fill({ weight: 60, reps: 6 }),
    'Leg Press': Array(3).fill({ weight: 50, reps: 12 }),
    'Lunges': Array(4).fill({ reps: 12 }),
    'Leg Curls': Array(3).fill({ weight: 32, reps: 12 }),
    'Rear Delt Flies': Array(3).fill({ weight: 9, reps: 12 }),
    'Overhead Press': Array(4).fill({ weight: 16, reps: 8 }),
    'Lateral Raises': Array(3).fill({ weight: 8, reps: 12 }),
    'Front Raises': Array(3).fill({ weight: 8, reps: 12 })

};