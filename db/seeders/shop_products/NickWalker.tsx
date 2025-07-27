export async function seedNickWalkerSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Nick Walker Inspired",
            "Heavy powerbuilding split with focus on strength and hypertrophy, inspired by Nick Walker's training style."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Heavy leg day",
            exercises: [
                { name: "Back Squat", rest_interval: 180, sets: [{ weight: 315, reps: 5 }, { weight: 355, reps: 3 }, { weight: 385, reps: 2 }] },
                { name: "Pause Squats", rest_interval: 150, sets: [{ weight: 275, reps: 6 }, { weight: 295, reps: 5 }, { weight: 315, reps: 4 }] },
                { name: "Leg Press", rest_interval: 90, sets: [{ weight: 450, reps: 12 }, { weight: 500, reps: 10 }, { weight: 550, reps: 8 }] },
                { name: "Romanian Deadlift", rest_interval: 120, sets: [{ weight: 225, reps: 10 }, { weight: 245, reps: 8 }, { weight: 265, reps: 6 }] },
                { name: "Seated Calf Raise", rest_interval: 60, sets: [{ weight: 140, reps: 15 }, { weight: 160, reps: 12 }, { weight: 180, reps: 10 }] }
            ]
        },
        {
            name: "Heavy chest day",
            exercises: [
                { name: "Flat Barbell Bench Press", rest_interval: 180, sets: [{ weight: 275, reps: 5 }, { weight: 295, reps: 3 }, { weight: 315, reps: 2 }] },
                { name: "Incline Dumbbell Press", rest_interval: 120, sets: [{ weight: 80, reps: 10 }, { weight: 90, reps: 8 }, { weight: 100, reps: 6 }] },
                { name: "Close-Grip Bench Press", rest_interval: 90, sets: [{ weight: 225, reps: 8 }, { weight: 245, reps: 6 }, { weight: 265, reps: 4 }] },
                { name: "Dumbbell Lateral Raise", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 25, reps: 12 }, { weight: 25, reps: 12 }] },
                { name: "Cable Triceps Pushdown", rest_interval: 60, sets: [{ weight: 60, reps: 15 }, { weight: 70, reps: 12 }, { weight: 80, reps: 10 }] }
            ]
        },
        {
            name: "Heavy back day",
            exercises: [
                { name: "Deadlift", rest_interval: 240, sets: [{ weight: 405, reps: 5 }, { weight: 455, reps: 3 }, { weight: 495, reps: 2 }] },
                { name: "Deficit Deadlift", rest_interval: 180, sets: [{ weight: 355, reps: 6 }, { weight: 375, reps: 5 }, { weight: 395, reps: 4 }] },
                { name: "Barbell Rows", rest_interval: 120, sets: [{ weight: 185, reps: 10 }, { weight: 205, reps: 8 }, { weight: 225, reps: 6 }] },
                { name: "Face Pulls", rest_interval: 60, sets: [{ weight: 45, reps: 20 }, { weight: 45, reps: 15 }, { weight: 45, reps: 15 }] },
                { name: "Hammer Curls", rest_interval: 60, sets: [{ weight: 35, reps: 12 }, { weight: 40, reps: 10 }, { weight: 45, reps: 8 }] }
            ]
        },
        {
            name: "Hypertrophy upper body",
            exercises: [
                { name: "Incline Barbell Bench Press", rest_interval: 120, sets: [{ weight: 185, reps: 10 }, { weight: 205, reps: 8 }, { weight: 225, reps: 6 }] },
                { name: "Weighted Pull-Ups", rest_interval: 120, sets: [{ weight: 25, reps: 8 }, { weight: 35, reps: 6 }, { weight: 45, reps: 4 }] },
                { name: "Seated Dumbbell Shoulder Press", rest_interval: 90, sets: [{ weight: 45, reps: 12 }, { weight: 50, reps: 10 }, { weight: 55, reps: 8 }] },
                { name: "Cable Lateral Raises", rest_interval: 60, sets: [{ weight: 20, reps: 15 }, { weight: 20, reps: 15 }, { weight: 20, reps: 15 }] },
                { name: "Skull Crushers", rest_interval: 60, sets: [{ weight: 70, reps: 12 }, { weight: 75, reps: 10 }, { weight: 80, reps: 8 }] },
                { name: "Barbell Curl", rest_interval: 60, sets: [{ weight: 70, reps: 12 }, { weight: 75, reps: 10 }, { weight: 80, reps: 8 }] }
            ]
        },
        {
            name: "Hypertrophy lower body",
            exercises: [
                { name: "Front Squat", rest_interval: 150, sets: [{ weight: 225, reps: 8 }, { weight: 245, reps: 6 }, { weight: 265, reps: 5 }] },
                { name: "Bulgarian Split Squat", rest_interval: 90, sets: [{ weight: 50, reps: 12 }, { weight: 55, reps: 10 }, { weight: 60, reps: 8 }] },
                { name: "Romanian Deadlift", rest_interval: 120, sets: [{ weight: 275, reps: 10 }, { weight: 295, reps: 8 }, { weight: 315, reps: 6 }] },
                { name: "Leg Curls", rest_interval: 60, sets: [{ weight: 90, reps: 15 }, { weight: 100, reps: 12 }, { weight: 110, reps: 10 }] },
                { name: "Standing Calf Raise", rest_interval: 60, sets: [{ weight: 200, reps: 20 }, { weight: 220, reps: 15 }, { weight: 240, reps: 12 }] }
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
