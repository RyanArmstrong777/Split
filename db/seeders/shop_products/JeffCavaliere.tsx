export async function seedJeffCavaliereSplit(db: any) {
  const result = await db.runAsync(
    `INSERT INTO splits (name, description) VALUES (?, ?)`,
    [
      "Jeff Cavaliere Inspired",
      "Balanced push/pull/legs split with strength, mobility, bodyweight, and 6-12-25 hypertrophy protocol.",
    ]
  );

  const splitId = result.lastInsertRowId;

  const workouts = [

    {
      name: "Push day",
      exercises: [
        {
          name: "Barbell Bench Press",
          rest_interval: 90,
          sets: [
            { weight: 135, reps: 6 },
            { weight: 115, reps: 12 },
            { weight: 75, reps: 25 },
          ],
        },
        {
          name: "Incline Dumbbell Press",
          rest_interval: 90,
          sets: [
            { weight: 40, reps: 6 },
            { weight: 30, reps: 12 },
            { weight: 20, reps: 25 },
          ],
        },
        {
          name: "Cable Chest Fly",
          rest_interval: 60,
          sets: [
            { weight: 20, reps: 6 },
            { weight: 15, reps: 12 },
            { weight: 10, reps: 25 },
          ],
        },
        {
          name: "Seated Dumbbell Shoulder Press",
          rest_interval: 90,
          sets: [
            { weight: 35, reps: 8 },
            { weight: 30, reps: 10 },
            { weight: 20, reps: 15 },
          ],
        },
        {
          name: "Lateral Raises",
          rest_interval: 60,
          sets: [
            { weight: 12, reps: 12 },
            { weight: 10, reps: 15 },
            { weight: 8, reps: 20 },
          ],
        },
        // Triceps
        {
          name: "Triceps Rope Pushdown",
          rest_interval: 60,
          sets: [
            { weight: 40, reps: 12 },
            { weight: 35, reps: 15 },
            { weight: 25, reps: 20 },
          ],
        },
        {
          name: "Bodyweight Dips",
          rest_interval: 60,
          sets: [
            { reps: 12 },
            { reps: 10 },
            { reps: 8 },
          ],
        },
      ],
    },

    // Pull Day (Back, Biceps, Rear Delts)
    {
      name: "Pull day",
      exercises: [
        // Heavy compound back lifts
        {
          name: "Deadlifts",
          rest_interval: 180,
          sets: [
            { weight: 185, reps: 5 },
            { weight: 225, reps: 3 },
            { weight: 275, reps: 1 },
          ],
        },
        {
          name: "Pull-Ups (Bodyweight or weighted)",
          rest_interval: 120,
          sets: [
            { reps: 8 },
            { reps: 6 },
            { reps: 4 },
          ],
        },
        {
          name: "Barbell Rows",
          rest_interval: 90,
          sets: [
            { weight: 95, reps: 10 },
            { weight: 85, reps: 12 },
            { weight: 75, reps: 15 },
          ],
        },
        {
          name: "Face Pulls",
          rest_interval: 60,
          sets: [
            { weight: 30, reps: 15 },
            { weight: 25, reps: 15 },
            { weight: 20, reps: 15 },
          ],
        },
        // Biceps 6-12-25 protocol
        {
          name: "EZ Bar Curls",
          rest_interval: 60,
          sets: [
            { weight: 40, reps: 6 },
            { weight: 30, reps: 12 },
            { weight: 20, reps: 25 },
          ],
        },
        {
          name: "Hammer Curls",
          rest_interval: 60,
          sets: [
            { weight: 30, reps: 12 },
            { weight: 25, reps: 15 },
            { weight: 20, reps: 20 },
          ],
        },
      ],
    },

    // Leg Day (Quads, Hamstrings, Glutes, Calves)
    {
      name: "Leg day",
      exercises: [
        {
          name: "Barbell Back Squats",
          rest_interval: 180,
          sets: [
            { weight: 185, reps: 6 },
            { weight: 225, reps: 4 },
            { weight: 275, reps: 2 },
          ],
        },
        {
          name: "Romanian Deadlifts",
          rest_interval: 120,
          sets: [
            { weight: 135, reps: 8 },
            { weight: 155, reps: 6 },
            { weight: 175, reps: 4 },
          ],
        },
        {
          name: "Walking Lunges (Bodyweight or weighted)",
          rest_interval: 90,
          sets: [
            { reps: 12 },
            { reps: 12 },
            { reps: 12 },
          ],
        },
        {
          name: "Leg Extensions",
          rest_interval: 60,
          sets: [
            { weight: 60, reps: 15 },
            { weight: 50, reps: 12 },
            { weight: 40, reps: 10 },
          ],
        },
        {
          name: "Seated Leg Curl",
          rest_interval: 60,
          sets: [
            { weight: 60, reps: 15 },
            { weight: 50, reps: 12 },
            { weight: 40, reps: 10 },
          ],
        },
        {
          name: "Standing Calf Raises",
          rest_interval: 60,
          sets: [
            { weight: 180, reps: 20 },
            { weight: 200, reps: 15 },
            { weight: 220, reps: 12 },
          ],
        },
      ],
    },

    // Core & Mobility Day (Active recovery & core emphasis)
    {
      name: "Core & mobility",
      exercises: [
        {
          name: "Recliner Elbow to Knee Tucks",
          rest_interval: 30,
          sets: [
            { reps: 15 },
            { reps: 15 },
            { reps: 15 },
          ],
        },
        {
          name: "Opposite Side Tuck Planks",
          rest_interval: 30,
          sets: [
            { reps: 30 }, // seconds hold
            { reps: 30 },
            { reps: 30 },
          ],
        },
        {
          name: "Plank Pushaways",
          rest_interval: 30,
          sets: [
            { reps: 12 },
            { reps: 12 },
            { reps: 12 },
          ],
        },
        {
          name: "Band Pull Aparts (for shoulder mobility)",
          rest_interval: 30,
          sets: [
            { reps: 20 },
            { reps: 20 },
            { reps: 20 },
          ],
        },
        {
          name: "Cat-Cow Stretch (mobility)",
          rest_interval: 30,
          sets: [
            { reps: 10 },
            { reps: 10 },
            { reps: 10 },
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
