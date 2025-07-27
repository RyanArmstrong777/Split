export async function seedSeanNalewanyjSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Sean Nalewanyj Inspired",
            "Balanced powerbuilding program emphasizing compound lifts, progressive overload, and hypertrophy volume."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Leg day",
            exercises: [
                { name: "Back Squat", rest_interval: 180, sets: [{ weight: 335, reps: 5 }, { weight: 355, reps: 3 }, { weight: 375, reps: 2 }] },
                { name: "Romanian Deadlift", rest_interval: 120, sets: [{ weight: 275, reps: 10 }, { weight: 295, reps: 8 }, { weight: 315, reps: 6 }] },
                { name: "Leg Press", rest_interval: 90, sets: [{ weight: 400, reps: 12 }, { weight: 450, reps: 10 }, { weight: 500, reps: 8 }] },
                { name: "Seated Leg Curl", rest_interval: 60, sets: [{ weight: 100, reps: 15 }, { weight: 110, reps: 12 }, { weight: 120, reps: 10 }] },
                { name: "Walking Lunges", rest_interval: 90, sets: [{ weight: 45, reps: 12 }, { weight: 50, reps: 10 }, { weight: 55, reps: 8 }] },
                { name: "Standing Calf Raise", rest_interval: 60, sets: [{ weight: 180, reps: 20 }, { weight: 200, reps: 15 }, { weight: 220, reps: 12 }] }
            ]
        },
        {
            name: "Push day",
            exercises: [
                { name: "Flat Barbell Bench Press", rest_interval: 180, sets: [{ weight: 295, reps: 5 }, { weight: 315, reps: 3 }, { weight: 335, reps: 2 }] },
                { name: "Incline Dumbbell Press", rest_interval: 120, sets: [{ weight: 85, reps: 12 }, { weight: 90, reps: 10 }, { weight: 95, reps: 8 }] },
                { name: "Dips (Weighted if possible)", rest_interval: 90, sets: [{ weight: 25, reps: 12 }, { weight: 30, reps: 10 }, { weight: 35, reps: 8 }] },
                { name: "Overhead Triceps Extension", rest_interval: 60, sets: [{ weight: 70, reps: 15 }, { weight: 75, reps: 12 }, { weight: 80, reps: 10 }] },
                { name: "Cable Fly", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 40, reps: 12 }, { weight: 45, reps: 10 }] },
                { name: "Close-Grip Bench Press", rest_interval: 120, sets: [{ weight: 225, reps: 8 }, { weight: 245, reps: 6 }, { weight: 265, reps: 5 }] }
            ]
        },
        {
            name: "Pull day",
            exercises: [
                { name: "Deadlift", rest_interval: 240, sets: [{ weight: 455, reps: 5 }, { weight: 495, reps: 3 }, { weight: 525, reps: 2 }] },
                { name: "Barbell Rows", rest_interval: 120, sets: [{ weight: 225, reps: 10 }, { weight: 245, reps: 8 }, { weight: 265, reps: 6 }] },
                { name: "Weighted Pull-Ups", rest_interval: 120, sets: [{ weight: 45, reps: 10 }, { weight: 50, reps: 8 }, { weight: 55, reps: 6 }] },
                { name: "Face Pulls", rest_interval: 60, sets: [{ weight: 40, reps: 20 }, { weight: 45, reps: 15 }, { weight: 50, reps: 12 }] },
                { name: "Cable Pullover", rest_interval: 60, sets: [{ weight: 70, reps: 15 }, { weight: 75, reps: 12 }, { weight: 80, reps: 10 }] },
                { name: "Hammer Curls", rest_interval: 60, sets: [{ weight: 40, reps: 12 }, { weight: 45, reps: 10 }, { weight: 50, reps: 8 }] }
            ]
        },
        {
            name: "Push day",
            exercises: [
                { name: "Overhead Press", rest_interval: 180, sets: [{ weight: 155, reps: 6 }, { weight: 165, reps: 5 }, { weight: 175, reps: 4 }] },
                { name: "Dumbbell Lateral Raises", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 30, reps: 12 }, { weight: 35, reps: 10 }] },
                { name: "Barbell Curl", rest_interval: 60, sets: [{ weight: 80, reps: 12 }, { weight: 85, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Skull Crushers", rest_interval: 60, sets: [{ weight: 70, reps: 12 }, { weight: 75, reps: 10 }, { weight: 80, reps: 8 }] },
                { name: "Cable Rope Triceps Pushdown", rest_interval: 60, sets: [{ weight: 65, reps: 15 }, { weight: 70, reps: 12 }, { weight: 75, reps: 10 }] },
                { name: "Incline Dumbbell Curl", rest_interval: 60, sets: [{ weight: 40, reps: 12 }, { weight: 45, reps: 10 }, { weight: 50, reps: 8 }] }
            ]
        },
        {
            name: "Leg accessories & core",
            exercises: [
                { name: "Bulgarian Split Squats", rest_interval: 90, sets: [{ weight: 50, reps: 12 }, { weight: 55, reps: 10 }, { weight: 60, reps: 8 }] },
                { name: "Leg Extensions", rest_interval: 60, sets: [{ weight: 120, reps: 15 }, { weight: 130, reps: 12 }, { weight: 140, reps: 10 }] },
                { name: "Seated Leg Curl", rest_interval: 60, sets: [{ weight: 110, reps: 15 }, { weight: 120, reps: 12 }, { weight: 130, reps: 10 }] },
                { name: "Standing Calf Raise", rest_interval: 60, sets: [{ weight: 200, reps: 20 }, { weight: 220, reps: 15 }, { weight: 240, reps: 12 }] },
                { name: "Hanging Leg Raises", rest_interval: 60, sets: [{ reps: 15 }, { reps: 15 }, { reps: 15 }] },
                { name: "Cable Woodchoppers", rest_interval: 60, sets: [{ weight: 60, reps: 12 }, { weight: 65, reps: 10 }, { weight: 70, reps: 8 }] }
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
