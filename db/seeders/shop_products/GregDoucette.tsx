export async function seedGregDoucetteSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Greg Doucette Inspired",
            "High-effort hypertrophy training with moderate rest and controlled tempo. Emphasizes proper form, time under tension, and sustainable training volume."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Push day",
            exercises: [
                { name: "Incline Dumbbell Press", rest_interval: 90, sets: [{ weight: 70, reps: 12 }, { weight: 80, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Flat Smith Machine Press", rest_interval: 90, sets: [{ weight: 135, reps: 15 }, { weight: 155, reps: 12 }, { weight: 175, reps: 10 }] },
                { name: "Machine Chest Fly", rest_interval: 60, sets: [{ weight: 100, reps: 15 }, { weight: 110, reps: 12 }, { weight: 120, reps: 10 }] },
                { name: "Cable Crossover", rest_interval: 60, sets: [{ weight: 30, reps: 15 }, { weight: 35, reps: 12 }, { weight: 40, reps: 10 }] },
                { name: "Overhead Cable Triceps Extension", rest_interval: 60, sets: [{ weight: 50, reps: 15 }, { weight: 60, reps: 12 }, { weight: 70, reps: 10 }] },
                { name: "Triceps Rope Pushdown", rest_interval: 60, sets: [{ weight: 45, reps: 20 }, { weight: 55, reps: 15 }, { weight: 65, reps: 12 }] }
            ]
        },
        {
            name: "Pull day",
            exercises: [
                { name: "Lat Pulldown", rest_interval: 90, sets: [{ weight: 120, reps: 15 }, { weight: 130, reps: 12 }, { weight: 140, reps: 10 }] },
                { name: "Seated Cable Row", rest_interval: 90, sets: [{ weight: 100, reps: 15 }, { weight: 110, reps: 12 }, { weight: 120, reps: 10 }] },
                { name: "One-Arm Dumbbell Row", rest_interval: 90, sets: [{ weight: 70, reps: 12 }, { weight: 80, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Straight-Arm Lat Pulldown", rest_interval: 60, sets: [{ weight: 50, reps: 15 }, { weight: 55, reps: 12 }, { weight: 60, reps: 10 }] },
                { name: "Incline Dumbbell Curl", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 30, reps: 12 }, { weight: 35, reps: 10 }] },
                { name: "EZ Bar Curl", rest_interval: 60, sets: [{ weight: 50, reps: 15 }, { weight: 60, reps: 12 }, { weight: 70, reps: 10 }] },
                { name: "Cable Biceps Curl", rest_interval: 45, sets: [{ weight: 35, reps: 20 }, { weight: 40, reps: 15 }, { weight: 45, reps: 12 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Leg Press", rest_interval: 120, sets: [{ weight: 400, reps: 20 }, { weight: 450, reps: 15 }, { weight: 500, reps: 12 }] },
                { name: "Back Squat", rest_interval: 150, sets: [{ weight: 225, reps: 10 }, { weight: 245, reps: 8 }, { weight: 265, reps: 6 }] },
                { name: "Walking Lunges", rest_interval: 90, sets: [{ weight: 25, reps: 20 }, { weight: 30, reps: 16 }, { weight: 35, reps: 14 }] },
                { name: "Leg Extension", rest_interval: 60, sets: [{ weight: 90, reps: 20 }, { weight: 100, reps: 15 }, { weight: 110, reps: 12 }] },
                { name: "Seated Calf Raise", rest_interval: 45, sets: [{ weight: 90, reps: 20 }, { weight: 100, reps: 18 }, { weight: 110, reps: 15 }] },
                { name: "Donkey Calf Raise", rest_interval: 45, sets: [{ weight: 180, reps: 20 }, { weight: 200, reps: 18 }, { weight: 220, reps: 15 }] }
            ]
        },
        {
            name: "Shoulders & arms",
            exercises: [
                { name: "Seated Dumbbell Shoulder Press", rest_interval: 90, sets: [{ weight: 45, reps: 15 }, { weight: 50, reps: 12 }, { weight: 55, reps: 10 }] },
                { name: "Lateral Raise", rest_interval: 60, sets: [{ weight: 20, reps: 20 }, { weight: 25, reps: 15 }, { weight: 25, reps: 15 }] },
                { name: "Rear Delt Fly (Machine)", rest_interval: 60, sets: [{ weight: 85, reps: 15 }, { weight: 90, reps: 12 }, { weight: 95, reps: 10 }] },
                { name: "Cable Upright Row", rest_interval: 60, sets: [{ weight: 60, reps: 15 }, { weight: 70, reps: 12 }, { weight: 80, reps: 10 }] },
                { name: "Dumbbell Hammer Curl", rest_interval: 60, sets: [{ weight: 30, reps: 15 }, { weight: 35, reps: 12 }, { weight: 40, reps: 10 }] },
                { name: "Rope Triceps Pushdown", rest_interval: 60, sets: [{ weight: 50, reps: 15 }, { weight: 60, reps: 12 }, { weight: 70, reps: 10 }] },
                { name: "Barbell Curl (Strict Form)", rest_interval: 60, sets: [{ weight: 60, reps: 12 }, { weight: 65, reps: 10 }, { weight: 70, reps: 8 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Romanian Deadlift", rest_interval: 120, sets: [{ weight: 185, reps: 12 }, { weight: 205, reps: 10 }, { weight: 225, reps: 8 }] },
                { name: "Hip Thrust (Barbell)", rest_interval: 120, sets: [{ weight: 185, reps: 15 }, { weight: 205, reps: 12 }, { weight: 225, reps: 10 }] },
                { name: "Lying Leg Curl", rest_interval: 60, sets: [{ weight: 80, reps: 15 }, { weight: 90, reps: 12 }, { weight: 100, reps: 10 }] },
                { name: "Step-Ups", rest_interval: 90, sets: [{ weight: 25, reps: 12 }, { weight: 30, reps: 10 }, { weight: 35, reps: 8 }] },
                { name: "Standing Calf Raise", rest_interval: 45, sets: [{ weight: 180, reps: 20 }, { weight: 200, reps: 18 }, { weight: 220, reps: 15 }] },
                { name: "Ab Wheel Rollout", rest_interval: 60, sets: [{ reps: 15 }, { reps: 15 }, { reps: 15 }] }
            ]
        },
        {
            name: "Full body",
            exercises: [
                { name: "Smith Machine Thrusters", rest_interval: 60, sets: [{ weight: 95, reps: 15 }, { weight: 105, reps: 12 }, { weight: 115, reps: 10 }] },
                { name: "Chin-Ups", rest_interval: 60, sets: [{ reps: 12 }, { reps: 10 }, { reps: 8 }] },
                { name: "Dumbbell Snatch", rest_interval: 60, sets: [{ weight: 35, reps: 10 }, { weight: 40, reps: 8 }, { weight: 45, reps: 6 }] },
                { name: "Push-Up to Row", rest_interval: 45, sets: [{ reps: 20 }, { reps: 15 }, { reps: 12 }] },
                { name: "Plank (Weighted)", rest_interval: 60, sets: [{ weight: 25, reps: 45 }, { weight: 35, reps: 30 }, { weight: 35, reps: 30 }] },
                { name: "Farmer's Walk", rest_interval: 90, sets: [{ weight: 60, reps: 30 }, { weight: 70, reps: 30 }, { weight: 80, reps: 30 }] }
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
