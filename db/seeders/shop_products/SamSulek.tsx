export async function seedSamSulekSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Sam Sulek Inspired",
            "Powerbuilding split mixing heavy strength training with volume hypertrophy work, inspired by Sam Sulek."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Leg day",
            exercises: [
                { name: "Back Squat", rest_interval: 180, sets: [{ weight: 365, reps: 3 }, { weight: 385, reps: 2 }, { weight: 405, reps: 1 }] },
                { name: "Paused Front Squat", rest_interval: 150, sets: [{ weight: 275, reps: 6 }, { weight: 295, reps: 5 }, { weight: 315, reps: 4 }] },
                { name: "Romanian Deadlift", rest_interval: 120, sets: [{ weight: 275, reps: 8 }, { weight: 295, reps: 6 }, { weight: 315, reps: 5 }] },
                { name: "Walking Lunges", rest_interval: 90, sets: [{ weight: 50, reps: 12 }, { weight: 55, reps: 10 }, { weight: 60, reps: 8 }] },
                { name: "Leg Extensions (Slow Eccentric)", rest_interval: 60, sets: [{ weight: 110, reps: 12 }, { weight: 120, reps: 10 }, { weight: 130, reps: 8 }] },
                { name: "Seated Calf Raise", rest_interval: 60, sets: [{ weight: 150, reps: 20 }, { weight: 170, reps: 15 }, { weight: 190, reps: 12 }] }
            ]
        },
        {
            name: "Push day",
            exercises: [
                { name: "Flat Barbell Bench Press", rest_interval: 180, sets: [{ weight: 315, reps: 3 }, { weight: 335, reps: 2 }, { weight: 355, reps: 1 }] },
                { name: "Close-Grip Bench Press", rest_interval: 120, sets: [{ weight: 275, reps: 8 }, { weight: 295, reps: 6 }, { weight: 315, reps: 5 }] },
                { name: "Incline Dumbbell Press", rest_interval: 120, sets: [{ weight: 90, reps: 10 }, { weight: 95, reps: 8 }, { weight: 100, reps: 6 }] },
                { name: "Overhead Press", rest_interval: 90, sets: [{ weight: 155, reps: 8 }, { weight: 165, reps: 6 }, { weight: 175, reps: 5 }] },
                { name: "Dumbbell Lateral Raises", rest_interval: 60, sets: [{ weight: 30, reps: 15 }, { weight: 30, reps: 12 }, { weight: 30, reps: 12 }] },
                { name: "Triceps Rope Pushdown", rest_interval: 60, sets: [{ weight: 70, reps: 15 }, { weight: 75, reps: 12 }, { weight: 80, reps: 10 }] }
            ]
        },
        {
            name: "Heavy Pull day",
            exercises: [
                { name: "Deadlift", rest_interval: 240, sets: [{ weight: 495, reps: 3 }, { weight: 525, reps: 2 }, { weight: 545, reps: 1 }] },
                { name: "Deficit Deadlift", rest_interval: 150, sets: [{ weight: 405, reps: 6 }, { weight: 425, reps: 5 }, { weight: 445, reps: 4 }] },
                { name: "Barbell Rows", rest_interval: 120, sets: [{ weight: 225, reps: 10 }, { weight: 245, reps: 8 }, { weight: 265, reps: 6 }] },
                { name: "Weighted Pull-Ups", rest_interval: 120, sets: [{ weight: 45, reps: 8 }, { weight: 55, reps: 6 }, { weight: 65, reps: 4 }] },
                { name: "Face Pulls", rest_interval: 60, sets: [{ weight: 50, reps: 20 }, { weight: 50, reps: 15 }, { weight: 50, reps: 15 }] },
                { name: "Hammer Curls", rest_interval: 60, sets: [{ weight: 40, reps: 12 }, { weight: 45, reps: 10 }, { weight: 50, reps: 8 }] }
            ]
        },
        {
            name: "Hypertrophy upper body day",
            exercises: [
                { name: "Incline Barbell Bench Press", rest_interval: 120, sets: [{ weight: 205, reps: 12 }, { weight: 225, reps: 10 }, { weight: 245, reps: 8 }] },
                { name: "Seated Dumbbell Shoulder Press", rest_interval: 90, sets: [{ weight: 55, reps: 15 }, { weight: 60, reps: 12 }, { weight: 65, reps: 10 }] },
                { name: "Lat Pulldown", rest_interval: 90, sets: [{ weight: 140, reps: 12 }, { weight: 150, reps: 10 }, { weight: 160, reps: 8 }] },
                { name: "Cable Lateral Raises", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 25, reps: 15 }, { weight: 25, reps: 15 }] },
                { name: "Skull Crushers", rest_interval: 60, sets: [{ weight: 80, reps: 12 }, { weight: 85, reps: 10 }, { weight: 90, reps: 8 }] },
                { name: "Barbell Curl", rest_interval: 60, sets: [{ weight: 80, reps: 12 }, { weight: 85, reps: 10 }, { weight: 90, reps: 8 }] }
            ]
        },
        {
            name: "Accessory & core day",
            exercises: [
                { name: "Walking Lunges", rest_interval: 90, sets: [{ weight: 55, reps: 12 }, { weight: 60, reps: 10 }, { weight: 65, reps: 8 }] },
                { name: "Leg Extensions", rest_interval: 60, sets: [{ weight: 120, reps: 15 }, { weight: 130, reps: 12 }, { weight: 140, reps: 10 }] },
                { name: "Lying Leg Curls", rest_interval: 60, sets: [{ weight: 110, reps: 15 }, { weight: 120, reps: 12 }, { weight: 130, reps: 10 }] },
                { name: "Standing Calf Raise", rest_interval: 60, sets: [{ weight: 230, reps: 20 }, { weight: 250, reps: 15 }, { weight: 270, reps: 12 }] },
                { name: "Cable Woodchoppers", rest_interval: 60, sets: [{ weight: 50, reps: 12 }, { weight: 55, reps: 10 }, { weight: 60, reps: 8 }] },
                { name: "Hanging Leg Raises", rest_interval: 60, sets: [{ reps: 15 }, { reps: 15 }, { reps: 15 }] }
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
