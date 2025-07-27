export async function seedJeremyEthierSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Jeremy Ethier Inspired",
            "Science-based 5-day push/pull/legs split focusing on compound lifts with optimal volume."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Push day",
            exercises: [
                { name: "Barbell Incline Bench Press", rest_interval: 120, sets: [{ weight: 155, reps: 8 }, { weight: 165, reps: 6 }, { weight: 175, reps: 4 }] },
                { name: "Dumbbell Shoulder Press", rest_interval: 90, sets: [{ weight: 40, reps: 10 }, { weight: 45, reps: 8 }, { weight: 50, reps: 6 }] },
                { name: "Dumbbell One-Arm Lateral Raise", rest_interval: 60, sets: [{ weight: 12, reps: 12 }, { weight: 12, reps: 12 }, { weight: 12, reps: 12 }] },
                { name: "Cable Crossover", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 25, reps: 15 }, { weight: 25, reps: 15 }] },
                { name: "Triceps Rope Pushdown", rest_interval: 60, sets: [{ weight: 40, reps: 12 }, { weight: 45, reps: 10 }, { weight: 50, reps: 8 }] }
            ]
        },
        {
            name: "Pull day",
            exercises: [
                { name: "Barbell Bent-Over Row", rest_interval: 120, sets: [{ weight: 135, reps: 8 }, { weight: 155, reps: 6 }, { weight: 175, reps: 4 }] },
                { name: "Machine Reverse Lat Pulldown", rest_interval: 90, sets: [{ weight: 100, reps: 12 }, { weight: 110, reps: 10 }, { weight: 120, reps: 8 }] },
                { name: "Machine Reverse Fly", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 35, reps: 15 }, { weight: 35, reps: 15 }] },
                { name: "Dumbbell Alternating Hammer Curl", rest_interval: 60, sets: [{ weight: 30, reps: 10 }, { weight: 30, reps: 10 }, { weight: 30, reps: 10 }] },
                { name: "EZ Bar Curl", rest_interval: 60, sets: [{ weight: 40, reps: 8 }, { weight: 45, reps: 8 }, { weight: 50, reps: 6 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Barbell Back Squat", rest_interval: 180, sets: [{ weight: 225, reps: 8 }, { weight: 255, reps: 6 }, { weight: 275, reps: 4 }] },
                { name: "Bench Hip Thrust", rest_interval: 120, sets: [{ weight: 185, reps: 10 }, { weight: 205, reps: 8 }, { weight: 225, reps: 6 }] },
                { name: "Dumbbell Walking Lunge", rest_interval: 90, sets: [{ weight: 30, reps: 12 }, { weight: 30, reps: 12 }, { weight: 30, reps: 12 }] },
                { name: "Single-Leg Calf Raise", rest_interval: 60, sets: [{ weight: null, reps: 15 }, { weight: null, reps: 15 }, { weight: null, reps: 15 }] },
                { name: "Leg Curl Machine", rest_interval: 60, sets: [{ weight: 80, reps: 12 }, { weight: 90, reps: 10 }, { weight: 100, reps: 8 }] }
            ]
        },
        {
            name: "Push day",
            exercises: [
                { name: "Flat Barbell Bench Press", rest_interval: 120, sets: [{ weight: 185, reps: 6 }, { weight: 205, reps: 4 }, { weight: 225, reps: 2 }] },
                { name: "Arnold Dumbbell Press", rest_interval: 90, sets: [{ weight: 35, reps: 12 }, { weight: 40, reps: 10 }, { weight: 45, reps: 8 }] },
                { name: "Cable Lateral Raise", rest_interval: 60, sets: [{ weight: 15, reps: 12 }, { weight: 15, reps: 12 }, { weight: 15, reps: 12 }] },
                { name: "Chest Fly Machine", rest_interval: 60, sets: [{ weight: 60, reps: 12 }, { weight: 70, reps: 10 }, { weight: 80, reps: 8 }] },
                { name: "Overhead Triceps Extension", rest_interval: 60, sets: [{ weight: 40, reps: 12 }, { weight: 45, reps: 10 }, { weight: 50, reps: 8 }] }
            ]
        },
        {
            name: "Pull day",
            exercises: [
                { name: "Weighted Pull-Ups", rest_interval: 120, sets: [{ weight: 10, reps: 6 }, { weight: 15, reps: 5 }, { weight: 20, reps: 4 }] },
                { name: "Seated Cable Row", rest_interval: 90, sets: [{ weight: 80, reps: 12 }, { weight: 100, reps: 10 }, { weight: 120, reps: 8 }] },
                { name: "Face Pulls", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 40, reps: 12 }, { weight: 45, reps: 10 }] },
                { name: "Incline Dumbbell Curl", rest_interval: 60, sets: [{ weight: 25, reps: 12 }, { weight: 30, reps: 10 }, { weight: 35, reps: 8 }] },
                { name: "Hammer Curl", rest_interval: 60, sets: [{ weight: 30, reps: 12 }, { weight: 35, reps: 10 }, { weight: 40, reps: 8 }] }
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
