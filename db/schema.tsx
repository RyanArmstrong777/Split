export async function createTables(db: any) {

    await db.execAsync('PRAGMA foreign_keys = ON');
    await db.execAsync('BEGIN TRANSACTION');

    try {

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS splits (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                description TEXT,
                UNIQUE(name)
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS app_settings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                theme TEXT DEFAULT 'dark',
                notifications_enabled INTEGER DEFAULT 1,
                weight_unit TEXT DEFAULT 'kg',
                vibration_feedback INTEGER DEFAULT 1,
                current_split_id INTEGER NOT NULL DEFAULT 1,
                FOREIGN KEY (current_split_id) REFERENCES splits(id)
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                split_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                day INTEGER NOT NULL,
                FOREIGN KEY(split_id) REFERENCES splits(id) ON DELETE CASCADE
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS completed_workouts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_id INTEGER NOT NULL,
                start_date TEXT NOT NULL CHECK(start_date LIKE '____-__-__'),
                FOREIGN KEY (workout_id) REFERENCES workouts(id) ON DELETE CASCADE,
                UNIQUE(workout_id, start_date)
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                workout_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                rest_interval INTEGER,
                FOREIGN KEY(workout_id) REFERENCES workouts(id) ON DELETE CASCADE
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS completed_exercises (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                rest_interval INTEGER,
                completed_workout_id INTEGER NOT NULL,
                FOREIGN KEY(completed_workout_id) REFERENCES completed_workouts(id) ON DELETE CASCADE
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                exercise_id INTEGER NOT NULL,
                weight INTEGER,
                reps INTEGER,
                time INTEGER,
                \`order\` INTEGER,
                FOREIGN KEY(exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS completed_sets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                completed_exercise_id INTEGER NOT NULL,
                target_weight INTEGER,
                weight REAL,
                target_reps INTEGER,
                reps INTEGER,
                target_time INTEGER,
                time INTEGER,
                completed INTEGER DEFAULT 0,
                \`order\` INTEGER,
                FOREIGN KEY(completed_exercise_id) REFERENCES completed_exercises(id) ON DELETE CASCADE
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS body_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                date TEXT NOT NULL DEFAULT (datetime('now')),
                weight REAL,
                body_fat_percentage REAL,
                BMI REAL
            );
        `);

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS shop_products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                difficulty TEXT,
                focus TEXT,
                price REAL NOT NULL,
                sale_price REAL,
                seeder TEXT,
                purchased BOOLEAN NOT NULL
            );
        `);

        await db.execAsync(`CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT)`);

        await db.execAsync('COMMIT');


    } catch (error) {
        await db.execAsync('ROLLBACK');
        throw error;
    }
}