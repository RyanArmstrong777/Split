export async function seedSimeonPandaSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Simeon Panda Inspired",
            "High-volume aesthetic-focused bodybuilding program inspired by Simeon Panda's training style. Emphasizes muscle symmetry, hypertrophy, and intensity."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Push day",
            exercises: [
                { name: "Flat Barbell Bench Press", rest_interval: 120, sets: [{ weight: 275, reps: 12 }, { weight: 295, reps: 10 }, { weight: 315, reps: 8 }, { weight: 295, reps: 10 }] },
                { name: "Incline Dumbbell Press", rest_interval: 90, sets: [{ weight: 85, reps: 12 }, { weight: 90, reps: 10 }, { weight: 95, reps: 8 }] },
                { name: "Cable Crossover", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 40, reps: 12 }, { weight: 45, reps: 10 }] },
                { name: "Dips", rest_interval: 60, sets: [{ reps: 15 }, { reps: 15 }, { reps: 15 }] },
                { name: "Triceps Rope Pushdown", rest_interval: 60, sets: [{ weight: 60, reps: 15 }, { weight: 65, reps: 12 }, { weight: 70, reps: 10 }] },
                { name: "Skull Crushers", rest_interval: 90, sets: [{ weight: 70, reps: 12 }, { weight: 75, reps: 10 }, { weight: 80, reps: 8 }] }
            ]
        },
        {
            name: "Pull day",
            exercises: [
                { name: "Deadlifts", rest_interval: 180, sets: [{ weight: 455, reps: 6 }, { weight: 475, reps: 4 }, { weight: 495, reps: 2 }] },
                { name: "Wide-Grip Pull-Ups", rest_interval: 90, sets: [{ reps: 15 }, { reps: 12 }, { reps: 10 }] },
                { name: "Barbell Rows", rest_interval: 120, sets: [{ weight: 225, reps: 12 }, { weight: 245, reps: 10 }, { weight: 265, reps: 8 }] },
                { name: "Lat Pulldown", rest_interval: 90, sets: [{ weight: 140, reps: 12 }, { weight: 150, reps: 10 }, { weight: 160, reps: 8 }] },
                { name: "Barbell Curls", rest_interval: 60, sets: [{ weight: 80, reps: 12 }, { weight: 85, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Preacher Curls", rest_interval: 60, sets: [{ weight: 70, reps: 15 }, { weight: 75, reps: 12 }, { weight: 80, reps: 10 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Barbell Back Squat", rest_interval: 180, sets: [{ weight: 365, reps: 10 }, { weight: 385, reps: 8 }, { weight: 405, reps: 6 }] },
                { name: "Leg Press", rest_interval: 120, sets: [{ weight: 500, reps: 12 }, { weight: 550, reps: 10 }, { weight: 600, reps: 8 }] },
                { name: "Stiff-Leg Deadlift", rest_interval: 90, sets: [{ weight: 225, reps: 12 }, { weight: 245, reps: 10 }, { weight: 265, reps: 8 }] },
                { name: "Leg Extensions", rest_interval: 60, sets: [{ weight: 120, reps: 15 }, { weight: 130, reps: 12 }, { weight: 140, reps: 10 }] },
                { name: "Standing Calf Raises", rest_interval: 60, sets: [{ weight: 200, reps: 20 }, { weight: 220, reps: 18 }, { weight: 240, reps: 15 }] },
                { name: "Seated Calf Raises", rest_interval: 60, sets: [{ weight: 90, reps: 20 }, { weight: 100, reps: 18 }, { weight: 110, reps: 15 }] }
            ]
        },
        {
            name: "Shoulders & abs",
            exercises: [
                { name: "Seated Overhead Dumbbell Press", rest_interval: 120, sets: [{ weight: 70, reps: 12 }, { weight: 75, reps: 10 }, { weight: 80, reps: 8 }] },
                { name: "Lateral Raises", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 30, reps: 12 }, { weight: 35, reps: 10 }] },
                { name: "Rear Delt Fly", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 30, reps: 12 }, { weight: 35, reps: 10 }] },
                { name: "Barbell Shrugs", rest_interval: 90, sets: [{ weight: 225, reps: 15 }, { weight: 245, reps: 12 }, { weight: 265, reps: 10 }] },
                { name: "Hanging Leg Raises", rest_interval: 60, sets: [{ reps: 20 }, { reps: 20 }, { reps: 20 }] },
                { name: "Cable Crunches", rest_interval: 60, sets: [{ weight: 60, reps: 20 }, { weight: 65, reps: 15 }, { weight: 70, reps: 12 }] }
            ]
        },
        {
            name: "Arms & isolation",
            exercises: [
                { name: "Close-Grip Bench Press", rest_interval: 120, sets: [{ weight: 225, reps: 10 }, { weight: 245, reps: 8 }, { weight: 265, reps: 6 }] },
                { name: "EZ Bar Curl", rest_interval: 60, sets: [{ weight: 70, reps: 15 }, { weight: 75, reps: 12 }, { weight: 80, reps: 10 }] },
                { name: "Overhead Dumbbell Extension", rest_interval: 60, sets: [{ weight: 80, reps: 12 }, { weight: 85, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Incline Dumbbell Curl", rest_interval: 60, sets: [{ weight: 40, reps: 12 }, { weight: 45, reps: 10 }, { weight: 50, reps: 8 }] },
                { name: "Cable Pushdowns", rest_interval: 60, sets: [{ weight: 60, reps: 15 }, { weight: 65, reps: 12 }, { weight: 70, reps: 10 }] },
                { name: "Concentration Curls", rest_interval: 60, sets: [{ weight: 30, reps: 15 }, { weight: 35, reps: 12 }, { weight: 40, reps: 10 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Front Squats", rest_interval: 120, sets: [{ weight: 225, reps: 12 }, { weight: 245, reps: 10 }, { weight: 265, reps: 8 }] },
                { name: "Walking Lunges", rest_interval: 90, sets: [{ weight: 45, reps: 20 }, { weight: 50, reps: 16 }, { weight: 55, reps: 12 }] },
                { name: "Leg Curls", rest_interval: 60, sets: [{ weight: 100, reps: 15 }, { weight: 110, reps: 12 }, { weight: 120, reps: 10 }] },
                { name: "Leg Extensions", rest_interval: 60, sets: [{ weight: 130, reps: 15 }, { weight: 140, reps: 12 }, { weight: 150, reps: 10 }] },
                { name: "Donkey Calf Raises", rest_interval: 60, sets: [{ weight: 180, reps: 20 }, { weight: 200, reps: 18 }, { weight: 220, reps: 15 }] },
                { name: "Plank (Weighted)", rest_interval: 60, sets: [{ reps: 60 }, { reps: 60 }, { reps: 60 }] }
            ]
        }
    ];

    for (let day = 0; day < workouts.length; day++) {
        const workout = workouts[day];
        const workoutRes = await db.runAsync(
            `INSERT INTO workouts (split_id, name, day) VALUES (?, ?, ?)`,
            [splitId, workout.name, day]
        );
        const workoutId = workoutRes.lastInsertRowId;

        for (const exercise of workout.exercises) {
            const exerciseRes = await db.runAsync(
                `INSERT INTO exercises (workout_id, name, rest_interval) VALUES (?, ?, ?)`,
                [workoutId, exercise.name, exercise.rest_interval]
            );
            const exerciseId = exerciseRes.lastInsertRowId;

            for (let i = 0; i < exercise.sets.length; i++) {
                const set = exercise.sets[i];
                await db.runAsync(
                    `INSERT INTO sets (exercise_id, weight, reps, \`order\`) VALUES (?, ?, ?, ?)`,
                    [exerciseId, 'weight' in set ? set.weight : null, set.reps || null, i + 1]
                );
            }
        }
    }
}
