export async function seedDavidLaidSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        ["David Laid PPL", "6-day powerbuilding split blending heavy strength work with hypertrophy-focused accessories"]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Push day",
            exercises: [
                { name: "Barbell Bench Press", rest_interval: 180, sets: [{ weight: 135, reps: 5 }, { weight: 155, reps: 5 }, { weight: 175, reps: 5 }, { weight: 135, reps: 8 }] },
                { name: "Incline Dumbbell Press", rest_interval: 120, sets: [{ weight: 50, reps: 10 }, { weight: 60, reps: 8 }, { weight: 70, reps: 6 }] },
                { name: "Seated Overhead Press", rest_interval: 120, sets: [{ weight: 65, reps: 8 }, { weight: 75, reps: 6 }, { weight: 85, reps: 6 }] },
                { name: "Dumbbell Lateral Raises", rest_interval: 60, sets: [{ weight: 15, reps: 15 }, { weight: 15, reps: 15 }, { weight: 15, reps: 15 }] },
                { name: "Cable Tricep Pushdowns", rest_interval: 60, sets: [{ weight: 30, reps: 15 }, { weight: 35, reps: 12 }, { weight: 40, reps: 10 }] },
                { name: "Overhead Tricep Extensions", rest_interval: 60, sets: [{ weight: 25, reps: 12 }, { weight: 30, reps: 10 }, { weight: 35, reps: 8 }] }
            ]
        },
        {
            name: "Pull day",
            exercises: [
                { name: "Deadlifts", rest_interval: 240, sets: [{ weight: 225, reps: 5 }, { weight: 275, reps: 5 }, { weight: 315, reps: 5 }] },
                { name: "Barbell Rows", rest_interval: 120, sets: [{ weight: 95, reps: 8 }, { weight: 115, reps: 8 }, { weight: 135, reps: 6 }] },
                { name: "Lat Pulldowns", rest_interval: 90, sets: [{ weight: 100, reps: 12 }, { weight: 110, reps: 10 }, { weight: 120, reps: 8 }] },
                { name: "Seated Cable Row", rest_interval: 90, sets: [{ weight: 80, reps: 12 }, { weight: 100, reps: 10 }, { weight: 120, reps: 8 }] },
                { name: "Barbell Curls", rest_interval: 60, sets: [{ weight: 40, reps: 10 }, { weight: 50, reps: 10 }, { weight: 60, reps: 8 }] },
                { name: "Alternating Dumbbell Curls", rest_interval: 60, sets: [{ weight: 20, reps: 12 }, { weight: 25, reps: 10 }, { weight: 30, reps: 8 }] },
                { name: "Face Pulls", rest_interval: 60, sets: [{ weight: 35, reps: 15 }, { weight: 40, reps: 15 }, { weight: 45, reps: 15 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Barbell Back Squats", rest_interval: 180, sets: [{ weight: 185, reps: 6 }, { weight: 225, reps: 4 }, { weight: 275, reps: 2 }, { weight: 185, reps: 8 }] },
                { name: "Romanian Deadlifts", rest_interval: 120, sets: [{ weight: 135, reps: 8 }, { weight: 155, reps: 6 }, { weight: 175, reps: 5 }] },
                { name: "Leg Press", rest_interval: 90, sets: [{ weight: 270, reps: 12 }, { weight: 320, reps: 10 }, { weight: 360, reps: 8 }] },
                { name: "Leg Extensions", rest_interval: 60, sets: [{ weight: 80, reps: 15 }, { weight: 90, reps: 12 }, { weight: 100, reps: 10 }] },
                { name: "Seated Leg Curls", rest_interval: 60, sets: [{ weight: 80, reps: 15 }, { weight: 100, reps: 12 }, { weight: 120, reps: 10 }] },
                { name: "Standing Calf Raises", rest_interval: 60, sets: [{ weight: 180, reps: 20 }, { weight: 200, reps: 15 }, { weight: 220, reps: 12 }] }
            ]
        }
    ];

    for (let day = 0; day < workouts.length * 2; day++) {
        const workout = workouts[day % 3];
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
