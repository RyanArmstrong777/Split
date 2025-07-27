export async function seedArnoldSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Arnold S. Inspired",
            "Classic Golden Era high-volume training inspired by Arnold Schwarzenegger. Focus on symmetry, intensity, and frequency with a blend of compound and isolation exercises."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Chest & back",
            exercises: [
                { name: "Barbell Bench Press", rest_interval: 90, sets: [{ weight: 225, reps: 12 }, { weight: 245, reps: 10 }, { weight: 265, reps: 8 }] },
                { name: "Incline Dumbbell Press", rest_interval: 90, sets: [{ weight: 70, reps: 12 }, { weight: 80, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Dumbbell Flyes", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 40, reps: 12 }, { weight: 45, reps: 10 }] },
                { name: "Pull-Ups", rest_interval: 60, sets: [{ weight: null, reps: 12 }, { weight: null, reps: 10 }, { weight: null, reps: 8 }] },
                { name: "T-Bar Row", rest_interval: 90, sets: [{ weight: 135, reps: 12 }, { weight: 160, reps: 10 }, { weight: 185, reps: 8 }] },
                { name: "Barbell Row", rest_interval: 90, sets: [{ weight: 155, reps: 12 }, { weight: 175, reps: 10 }, { weight: 195, reps: 8 }] },
                { name: "Straight-Arm Pulldown", rest_interval: 60, sets: [{ weight: 45, reps: 15 }, { weight: 50, reps: 12 }, { weight: 55, reps: 10 }] }
            ]
        },
        {
            name: "Shoulders & arms",
            exercises: [
                { name: "Seated Barbell Shoulder Press", rest_interval: 90, sets: [{ weight: 115, reps: 12 }, { weight: 135, reps: 10 }, { weight: 155, reps: 8 }] },
                { name: "Arnold Press", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 40, reps: 12 }, { weight: 45, reps: 10 }] },
                { name: "Lateral Raise", rest_interval: 60, sets: [{ weight: 20, reps: 15 }, { weight: 25, reps: 12 }, { weight: 25, reps: 12 }] },
                { name: "Barbell Curl", rest_interval: 60, sets: [{ weight: 70, reps: 12 }, { weight: 80, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Preacher Curl", rest_interval: 60, sets: [{ weight: 55, reps: 12 }, { weight: 65, reps: 10 }, { weight: 70, reps: 8 }] },
                { name: "Close-Grip Bench Press", rest_interval: 60, sets: [{ weight: 135, reps: 12 }, { weight: 155, reps: 10 }, { weight: 175, reps: 8 }] },
                { name: "Overhead Dumbbell Extension", rest_interval: 60, sets: [{ weight: 60, reps: 12 }, { weight: 70, reps: 10 }, { weight: 75, reps: 8 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Back Squat", rest_interval: 120, sets: [{ weight: 225, reps: 15 }, { weight: 245, reps: 12 }, { weight: 275, reps: 10 }] },
                { name: "Front Squat", rest_interval: 120, sets: [{ weight: 135, reps: 12 }, { weight: 155, reps: 10 }, { weight: 175, reps: 8 }] },
                { name: "Leg Press", rest_interval: 90, sets: [{ weight: 400, reps: 15 }, { weight: 450, reps: 12 }, { weight: 500, reps: 10 }] },
                { name: "Leg Curls", rest_interval: 60, sets: [{ weight: 90, reps: 15 }, { weight: 100, reps: 12 }, { weight: 110, reps: 10 }] },
                { name: "Walking Lunges", rest_interval: 60, sets: [{ weight: 50, reps: 20 }, { weight: 60, reps: 16 }, { weight: 70, reps: 12 }] },
                { name: "Standing Calf Raise", rest_interval: 60, sets: [{ weight: 200, reps: 20 }, { weight: 220, reps: 15 }, { weight: 240, reps: 12 }] },
                { name: "Seated Calf Raise", rest_interval: 60, sets: [{ weight: 120, reps: 20 }, { weight: 140, reps: 15 }, { weight: 160, reps: 12 }] }
            ]
        },
        {
            name: "Upper chest & arms",
            exercises: [
                { name: "Incline Barbell Press", rest_interval: 90, sets: [{ weight: 185, reps: 12 }, { weight: 205, reps: 10 }, { weight: 225, reps: 8 }] },
                { name: "Incline Dumbbell Flyes", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 40, reps: 12 }, { weight: 45, reps: 10 }] },
                { name: "EZ-Bar Curl", rest_interval: 60, sets: [{ weight: 65, reps: 12 }, { weight: 75, reps: 10 }, { weight: 85, reps: 8 }] },
                { name: "Concentration Curl", rest_interval: 60, sets: [{ weight: 30, reps: 12 }, { weight: 35, reps: 10 }, { weight: 40, reps: 8 }] },
                { name: "Triceps Pushdown", rest_interval: 60, sets: [{ weight: 60, reps: 15 }, { weight: 70, reps: 12 }, { weight: 80, reps: 10 }] },
                { name: "One-Arm Overhead Cable Extension", rest_interval: 60, sets: [{ weight: 25, reps: 12 }, { weight: 30, reps: 10 }, { weight: 35, reps: 8 }] },
                { name: "Reverse Curls", rest_interval: 60, sets: [{ weight: 50, reps: 12 }, { weight: 55, reps: 10 }, { weight: 60, reps: 8 }] }
            ]
        },
        {
            name: "Back width & posterior chain",
            exercises: [
                { name: "Wide-Grip Pull-Ups", rest_interval: 90, sets: [{ weight: null, reps: 12 }, { weight: null, reps: 12 }, { weight: null, reps: 10 }] },
                { name: "Lat Pulldown", rest_interval: 90, sets: [{ weight: 120, reps: 15 }, { weight: 130, reps: 12 }, { weight: 140, reps: 10 }] },
                { name: "Barbell Deadlift", rest_interval: 180, sets: [{ weight: 275, reps: 10 }, { weight: 315, reps: 8 }, { weight: 365, reps: 6 }] },
                { name: "Dumbbell Row", rest_interval: 90, sets: [{ weight: 70, reps: 12 }, { weight: 80, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Rear Delt Flyes", rest_interval: 60, sets: [{ weight: 20, reps: 15 }, { weight: 25, reps: 12 }, { weight: 30, reps: 10 }] },
                { name: "Shrugs", rest_interval: 60, sets: [{ weight: 225, reps: 15 }, { weight: 245, reps: 12 }, { weight: 265, reps: 10 }] },
                { name: "Hyperextensions", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 25, reps: 12 }, { weight: 25, reps: 10 }] }
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
