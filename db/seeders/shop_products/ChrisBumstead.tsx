export async function seedChrisBumsteadSplit(db: any) {
    const result = await db.runAsync(
        `INSERT INTO splits (name, description) VALUES (?, ?)`,
        [
            "Chris Bumstead Inspired",
            "Classic physique aesthetic split inspired by Chris Bumstead. Focuses on volume, symmetry, and controlled form across six training days."
        ]
    );

    const splitId = result.lastInsertRowId;

    const workouts = [
        {
            name: "Push day",
            exercises: [
                { name: "Incline Barbell Press", rest_interval: 120, sets: [{ weight: 185, reps: 12 }, { weight: 205, reps: 10 }, { weight: 225, reps: 8 }] },
                { name: "Flat Dumbbell Press", rest_interval: 90, sets: [{ weight: 80, reps: 12 }, { weight: 90, reps: 10 }, { weight: 100, reps: 8 }] },
                { name: "Cable Crossover", rest_interval: 60, sets: [{ weight: 40, reps: 15 }, { weight: 45, reps: 15 }, { weight: 50, reps: 12 }] },
                { name: "Seated Dumbbell Lateral Raise", rest_interval: 60, sets: [{ weight: 20, reps: 15 }, { weight: 20, reps: 15 }, { weight: 25, reps: 12 }] },
                { name: "Reverse Pec Deck", rest_interval: 60, sets: [{ weight: 70, reps: 15 }, { weight: 75, reps: 12 }, { weight: 80, reps: 12 }] },
                { name: "Rope Triceps Pushdown", rest_interval: 60, sets: [{ weight: 50, reps: 15 }, { weight: 55, reps: 12 }, { weight: 60, reps: 12 }] },
                { name: "Overhead Dumbbell Extension", rest_interval: 60, sets: [{ weight: 60, reps: 12 }, { weight: 65, reps: 10 }, { weight: 70, reps: 8 }] }
            ]
        },
        {
            name: "Pull day",
            exercises: [
                { name: "Wide-Grip Lat Pulldown", rest_interval: 90, sets: [{ weight: 120, reps: 15 }, { weight: 130, reps: 12 }, { weight: 140, reps: 10 }] },
                { name: "Seated Cable Row", rest_interval: 90, sets: [{ weight: 100, reps: 12 }, { weight: 110, reps: 10 }, { weight: 120, reps: 10 }] },
                { name: "Chest Supported T-Bar Row", rest_interval: 90, sets: [{ weight: 90, reps: 12 }, { weight: 100, reps: 10 }, { weight: 110, reps: 8 }] },
                { name: "Straight-Arm Cable Pulldown", rest_interval: 60, sets: [{ weight: 50, reps: 15 }, { weight: 55, reps: 12 }, { weight: 60, reps: 12 }] },
                { name: "Incline Dumbbell Curl", rest_interval: 60, sets: [{ weight: 25, reps: 15 }, { weight: 30, reps: 12 }, { weight: 30, reps: 10 }] },
                { name: "EZ Bar Curl", rest_interval: 60, sets: [{ weight: 50, reps: 15 }, { weight: 60, reps: 12 }, { weight: 70, reps: 10 }] },
                { name: "Concentration Curl", rest_interval: 60, sets: [{ weight: 25, reps: 12 }, { weight: 25, reps: 12 }, { weight: 30, reps: 10 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Back Squat", rest_interval: 150, sets: [{ weight: 225, reps: 12 }, { weight: 275, reps: 10 }, { weight: 295, reps: 8 }] },
                { name: "Leg Press", rest_interval: 120, sets: [{ weight: 400, reps: 15 }, { weight: 450, reps: 12 }, { weight: 500, reps: 10 }] },
                { name: "Walking Lunges", rest_interval: 90, sets: [{ weight: 40, reps: 20 }, { weight: 45, reps: 20 }, { weight: 50, reps: 16 }] },
                { name: "Leg Extension", rest_interval: 60, sets: [{ weight: 80, reps: 15 }, { weight: 90, reps: 15 }, { weight: 100, reps: 12 }] },
                { name: "Sissy Squat (Bodyweight)", rest_interval: 60, sets: [{ reps: 15 }, { reps: 15 }, { reps: 12 }] },
                { name: "Standing Calf Raise", rest_interval: 60, sets: [{ weight: 180, reps: 20 }, { weight: 200, reps: 15 }, { weight: 220, reps: 15 }] }
            ]
        },
        {
            name: "Rest / Active recovery",
            exercises: []
        },
        {
            name: "Shoulders & arms",
            exercises: [
                { name: "Dumbbell Shoulder Press", rest_interval: 90, sets: [{ weight: 50, reps: 12 }, { weight: 55, reps: 10 }, { weight: 60, reps: 8 }] },
                { name: "Cable Lateral Raises", rest_interval: 60, sets: [{ weight: 20, reps: 15 }, { weight: 20, reps: 15 }, { weight: 25, reps: 12 }] },
                { name: "Reverse Pec Deck", rest_interval: 60, sets: [{ weight: 80, reps: 15 }, { weight: 85, reps: 12 }, { weight: 90, reps: 12 }] },
                { name: "Preacher Curl", rest_interval: 60, sets: [{ weight: 45, reps: 15 }, { weight: 50, reps: 12 }, { weight: 55, reps: 10 }] },
                { name: "Hammer Curl", rest_interval: 60, sets: [{ weight: 30, reps: 12 }, { weight: 35, reps: 10 }, { weight: 40, reps: 8 }] },
                { name: "Skull Crushers", rest_interval: 60, sets: [{ weight: 70, reps: 12 }, { weight: 75, reps: 10 }, { weight: 80, reps: 8 }] },
                { name: "Rope Pushdowns", rest_interval: 60, sets: [{ weight: 60, reps: 15 }, { weight: 70, reps: 12 }, { weight: 80, reps: 12 }] }
            ]
        },
        {
            name: "Leg day",
            exercises: [
                { name: "Romanian Deadlift", rest_interval: 120, sets: [{ weight: 225, reps: 12 }, { weight: 245, reps: 10 }, { weight: 265, reps: 8 }] },
                { name: "Seated Leg Curl", rest_interval: 90, sets: [{ weight: 80, reps: 15 }, { weight: 90, reps: 12 }, { weight: 100, reps: 10 }] },
                { name: "Hip Thrust", rest_interval: 120, sets: [{ weight: 185, reps: 12 }, { weight: 205, reps: 10 }, { weight: 225, reps: 8 }] },
                { name: "Cable Kickbacks", rest_interval: 60, sets: [{ weight: 30, reps: 15 }, { weight: 35, reps: 12 }, { weight: 40, reps: 10 }] },
                { name: "Adductor Machine", rest_interval: 60, sets: [{ weight: 60, reps: 15 }, { weight: 70, reps: 12 }, { weight: 80, reps: 12 }] },
                { name: "Calf Press on Leg Press", rest_interval: 60, sets: [{ weight: 180, reps: 20 }, { weight: 200, reps: 18 }, { weight: 220, reps: 15 }] }
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
            console.log(exerciseId)

            for (let i = 0; i < (exercise.sets || []).length; i++) {
                const set = exercise.sets[i];
                await db.runAsync(
                    `INSERT INTO sets (exercise_id, weight, reps, \`order\`) VALUES (?, ?, ?, ?)`,
                    [exerciseId, 'weight' in set ? set.weight : null, set.reps || null, i + 1]
                );
            }
        }
    }
}
