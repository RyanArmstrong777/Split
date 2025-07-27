export async function seedJeffNippardSplit(db: any) {
  const result = await db.runAsync(
    `INSERT INTO splits (name, description) VALUES (?, ?)`,
    [
      "Jeff Nippard Inspired",
      "Science-based powerbuilding with focus on volume, intensity, and hypertrophy.",
    ]
  );

  const splitId = result.lastInsertRowId;

  const workouts = [
    {
      name: "Leg day",
      exercises: [
        {
          name: "Squat",
          rest_interval: 180,
          sets: [
            { weight: 275, reps: 4 },
            { weight: 275, reps: 4 },
            { weight: 275, reps: 4 },
          ],
        },
        {
          name: "Romanian Deadlift",
          rest_interval: 120,
          sets: [
            { weight: 185, reps: 10 },
            { weight: 185, reps: 10 },
            { weight: 185, reps: 10 },
          ],
        },
        {
          name: "Single Leg Press",
          rest_interval: 90,
          sets: [
            { weight: 200, reps: 15 },
            { weight: 200, reps: 15 },
            { weight: 200, reps: 15 },
          ],
        },
        {
          name: "Eccentric Leg Extension",
          rest_interval: 90,
          sets: [
            { weight: 80, reps: 12 },
            { weight: 80, reps: 12 },
            { weight: 80, reps: 10 },
          ],
        },
        {
          name: "Seated Leg Curls",
          rest_interval: 90,
          sets: [
            { weight: 70, reps: 12 },
            { weight: 70, reps: 12 },
            { weight: 70, reps: 10 },
          ],
        },
        {
          name: "Standing Calf Raise",
          rest_interval: 60,
          sets: [
            { weight: 135, reps: 12 },
            { weight: 135, reps: 12 },
            { weight: 135, reps: 12 },
          ],
        },
        {
          name: "Decline Crunches",
          rest_interval: 30,
          sets: [
            { weight: null, reps: 12 },
            { weight: null, reps: 12 },
          ],
        },
        {
          name: "Long-Lever Planks",
          rest_interval: 30,
          sets: [
            { weight: null, reps: 30 },
            { weight: null, reps: 30 },
          ],
        },
      ],
    },
    {
      name: "Push day",
      exercises: [
        {
          name: "Bench Press",
          rest_interval: 150,
          sets: [
            { weight: 225, reps: 8 },
            { weight: 225, reps: 8 },
            { weight: 225, reps: 8 },
          ],
        },
        {
          name: "Machine Shoulder Press",
          rest_interval: 90,
          sets: [
            { weight: 90, reps: 12 },
            { weight: 90, reps: 12 },
            { weight: 90, reps: 12 },
          ],
        },
        {
          name: "Dips",
          rest_interval: 60,
          sets: [
            { weight: null, reps: 15 },
            { weight: null, reps: 15 },
            { weight: null, reps: 15 },
          ],
        },
        {
          name: "Eccentric Skullcrushers",
          rest_interval: 90,
          sets: [
            { weight: 60, reps: 10 },
            { weight: 60, reps: 10 },
            { weight: 60, reps: 10 },
          ],
        },
        {
          name: "Egyptian Lateral Raise",
          rest_interval: 60,
          sets: [
            { weight: 15, reps: 12 },
            { weight: 15, reps: 12 },
            { weight: 15, reps: 12 },
          ],
        },
        {
          name: "Cable Triceps Kickbacks",
          rest_interval: 60,
          sets: [
            { weight: 25, reps: 30 },
            { weight: 25, reps: 30 },
            { weight: 25, reps: 30 },
          ],
        },
      ],
    },
    {
      name: "Pull day",
      exercises: [
        {
          name: "Weighted Pull-Up",
          rest_interval: 120,
          sets: [
            { weight: 45, reps: 6 },
            { weight: 45, reps: 6 },
            { weight: 45, reps: 6 },
          ],
        },
        {
          name: "Seated Cable Row",
          rest_interval: 90,
          sets: [
            { weight: 140, reps: 12 },
            { weight: 140, reps: 12 },
            { weight: 140, reps: 12 },
          ],
        },
        {
          name: "Cable Pullover",
          rest_interval: 60,
          sets: [
            { weight: 40, reps: 20 },
            { weight: 40, reps: 20 },
            { weight: 40, reps: 20 },
          ],
        },
        {
          name: "Hammer Cheat Curl",
          rest_interval: 60,
          sets: [
            { weight: 35, reps: 10 },
            { weight: 35, reps: 10 },
            { weight: 35, reps: 10 },
          ],
        },
        {
          name: "Incline Dumbbell Curl",
          rest_interval: 60,
          sets: [
            { weight: 25, reps: 15 },
            { weight: 25, reps: 15 },
          ],
        },
      ],
    },
    {
      name: "Leg day",
      exercises: [
        {
          name: "Deadlift",
          rest_interval: 240,
          sets: [
            { weight: 315, reps: 3 },
            { weight: 315, reps: 3 },
            { weight: 315, reps: 3 },
          ],
        },
        {
          name: "Hack Squat",
          rest_interval: 90,
          sets: [
            { weight: 180, reps: 12 },
            { weight: 180, reps: 12 },
            { weight: 180, reps: 12 },
          ],
        },
        {
          name: "Single-Leg Hip Thrust",
          rest_interval: 90,
          sets: [
            { weight: 50, reps: 15 },
            { weight: 50, reps: 15 },
            { weight: 50, reps: 15 },
          ],
        },
        {
          name: "Nordic Ham Curl",
          rest_interval: 60,
          sets: [
            { weight: null, reps: 12 },
            { weight: null, reps: 12 },
          ],
        },
        {
          name: "Prisoner Back Extension",
          rest_interval: 60,
          sets: [
            { weight: null, reps: 12 },
            { weight: null, reps: 12 },
          ],
        },
        {
          name: "Single-Leg Calf Raise",
          rest_interval: 60,
          sets: [
            { weight: 45, reps: 10 },
            { weight: 45, reps: 10 },
            { weight: 45, reps: 10 },
          ],
        },
        {
          name: "Weighted L-Sit Hold",
          rest_interval: 30,
          sets: [
            { weight: null, reps: 30 },
            { weight: null, reps: 30 },
            { weight: null, reps: 30 },
          ],
        },
      ],
    },
    {
      name: "Push day",
      exercises: [
        {
          name: "Overhead Press",
          rest_interval: 180,
          sets: [
            { weight: 135, reps: 4 },
            { weight: 135, reps: 4 },
            { weight: 135, reps: 4 },
            { weight: 135, reps: 4 },
          ],
        },
        {
          name: "Close-Grip Bench Press",
          rest_interval: 90,
          sets: [
            { weight: 185, reps: 10 },
            { weight: 185, reps: 10 },
            { weight: 185, reps: 10 },
          ],
        },
        {
          name: "Cable Crossover",
          rest_interval: 90,
          sets: [
            { weight: 25, reps: 12 },
            { weight: 25, reps: 12 },
            { weight: 25, reps: 12 },
          ],
        },
        {
          name: "Overhead Triceps Extension",
          rest_interval: 90,
          sets: [
            { weight: 40, reps: 12 },
            { weight: 40, reps: 12 },
            { weight: 40, reps: 12 },
          ],
        },
        {
          name: "Lateral Raise 21’s",
          rest_interval: 60,
          sets: [
            { weight: 15, reps: 7 },
            { weight: 15, reps: 7 },
            { weight: 15, reps: 7 },
          ],
        },
        {
          name: "Neck Flexion/Extension",
          rest_interval: 60,
          sets: [
            { weight: null, reps: 12 },
            { weight: null, reps: 12 },
            { weight: null, reps: 12 },
          ],
        },
      ],
    },
    {
      name: "Pull day",
      exercises: [
        {
          name: "Omni-Grip Lat Pulldown",
          rest_interval: 90,
          sets: [
            { weight: 120, reps: 12 },
            { weight: 120, reps: 12 },
            { weight: 120, reps: 12 },
          ],
        },
        {
          name: "Chest Supported Row",
          rest_interval: 90,
          sets: [
            { weight: 140, reps: 12 },
            { weight: 140, reps: 12 },
            { weight: 140, reps: 12 },
          ],
        },
        {
          name: "Rope Face Pull",
          rest_interval: 60,
          sets: [
            { weight: 40, reps: 20 },
            { weight: 40, reps: 20 },
            { weight: 40, reps: 20 },
          ],
        },
        {
          name: "Incline Dumbbell Shrug",
          rest_interval: 60,
          sets: [
            { weight: 50, reps: 20 },
            { weight: 50, reps: 20 },
            { weight: 50, reps: 20 },
          ],
        },
        // Optional
        {
          name: "Reverse Pec Deck",
          rest_interval: 60,
          sets: [
            { weight: 30, reps: 15 },
            { weight: 30, reps: 15 },
          ],
        },
        {
          name: "Pronated/Supinated Curl",
          rest_interval: 60,
          sets: [
            { weight: 30, reps: 10 },
            { weight: 30, reps: 10 },
          ],
        },
      ],
    },
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
          [
            exerciseId,
            "weight" in set ? set.weight : null,
            set.reps || null,
            i + 1,
          ]
        );
      }
    }
  }
}
