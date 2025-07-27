export async function seedShopProducts(db: any) {
    const products = [
        {
            title: "Arnold Inspired",
            description: "A golden-era high-volume split inspired by Arnold's legendary chest/back and shoulder/arm training days. Perfect for anyone chasing classic bodybuilding aesthetics with a focus on intensity and symmetry.",
            price: 1.99,
            seeder: "seedArnoldSplit",
            focus: "Bodybuilding",
            difficulty: "Advanced"
        },
        {
            title: "CBUM Inspired",
            description: "Train like the Classic Physique legend. This split emphasizes clean form, mind-muscle connection, and symmetry — ideal for those seeking that refined, proportionate physique.",
            price: 1.99,
            seeder: "seedChrisBumsteadSplit",
            focus: "Bodybuilding",
            difficulty: "Intermediate"
        },
        {
            title: "David Laid Inspired",
            description: "Built for strength and aesthetics, this hybrid program draws from David's blend of powerlifting foundations and high-volume hypertrophy work. Great for those transitioning from strength to style.",
            price: 1.99,
            seeder: "seedDavidLaidSplit",
            focus: "Powerbuilding",
            difficulty: "Intermediate"
        },
        {
            title: "Greg Doucette Inspired",
            description: "A smart, no-BS training split with a blend of high-intensity and volume. Inspired by Coach Greg's evidence-based approach and loud encouragement to train hard—but not stupid.",
            price: 1.99,
            seeder: "seedGregDoucetteSplit",
            focus: "Bodybuilding",
            difficulty: "Intermediate"
        },
        {
            title: "Jeff Cavaliere Inspired",
            description: "Physio-backed and athlete-approved, this split focuses on function, symmetry, and injury prevention — a well-rounded approach inspired by Jeff's training philosophy.",
            price: 1.99,
            seeder: "seedJeffCavaliereSplit",
            focus: "Functional Strength",
            difficulty: "Intermediate"
        },
        {
            title: "Jeff Nippard Inspired",
            description: "Science meets gains. This split focuses on evidence-based training methods, proper volume management, and exercise variety. Great for lifters who want to train smart and hard.",
            price: 1.99,
            seeder: "seedJeffNippardSplit",
            focus: "Bodybuilding",
            difficulty: "Intermediate"
        },
        {
            title: "Jeremy Ethier Inspired",
            description: "A minimalist, science-backed split that hits all the right muscles with just enough volume to grow. Inspired by Jeremy's clear, efficient, and effective training strategies.",
            price: 1.99,
            seeder: "seedJeremyEthierSplit",
            focus: "General Fitness",
            difficulty: "Beginner"
        },
        {
            title: "Nick Walker Inspired",
            description: "Mass-focused and brutally intense, this split is all about size. Inspired by Nick's freakish density and work ethic, it's built for serious lifters chasing serious muscle.",
            price: 1.99,
            seeder: "seedNickWalkerSplit",
            focus: "Bodybuilding",
            difficulty: "Advanced"
        },
        {
            title: "Omar Isuf Inspired",
            description: "Strength, hypertrophy, and personality—this program mixes classic lifts with physique work, in Omar's trademark evidence-driven style. Great for those who love the gym *and* the nerdy details.",
            price: 1.99,
            seeder: "seedOmarIsufSplit",
            focus: "Powerbuilding",
            difficulty: "Intermediate"
        },
        {
            title: "Sam Sulek Inspired",
            description: "A high-volume, train-to-failure beast of a split for lifters who like to push limits. Inspired by Sam's intense, no-nonsense approach to classic bodybuilding training.",
            price: 1.99,
            seeder: "seedSamSulekSplit",
            focus: "Bodybuilding",
            difficulty: "Advanced"
        },
        {
            title: "Sean Nalewanyj Inspired",
            description: "Simple, effective, and efficient. Sean's program focuses on sustainable progress, proper form, and evidence-backed hypertrophy principles without the fluff.",
            price: 1.99,
            seeder: "seedSeanNalewanyjSplit",
            focus: "Bodybuilding",
            difficulty: "Beginner"
        },
        {
            title: "Simeon Panda Inspired",
            description: "Aesthetic-focused and high-intensity, this split mirrors Simeon's consistent, disciplined, and hard-hitting training style — perfect for building size and definition.",
            price: 1.99,
            seeder: "seedSimeonPandaSplit",
            focus: "Bodybuilding",
            difficulty: "Advanced"
        }
    ];

    for (const product of products) {
        await db.runAsync(
            `INSERT INTO shop_products (title, description, difficulty, focus, price, sale_price, seeder, purchased)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                product.title,
                product.description,
                product.difficulty,
                product.focus,
                product.price,
                null,
                product.seeder,
                0
            ]
        );
    }
}
