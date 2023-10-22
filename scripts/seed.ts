const { PrismaClient } = require('@prisma/client');

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Comupter Science" },
                { name: "Mathematics" },
                { name: "Physics" },
                { name: "Chemistry" },
                { name: "Biology" },
                { name: "Geography" },
                { name: "History" },
                { name: "Economics" },
                { name: "Literature" },
                { name: "Philosophy" },
                { name: "Psychology" },
                { name: "Sociology" },
                { name: "Law" },
                { name: "Business" },
                { name: "Accounting" },
                { name: "Marketing" },
                { name: "Finance" },
                { name: "Management" },
                { name: "Engineering" },
                { name: "Architecture" },
                { name: "Medicine" },
                { name: "Nursing" },
                { name: "Pharmacy" },
                { name: "Dentistry" },
                { name: "Agriculture" },
                { name: "Food Science" },
                { name: "Nutrition" },
                { name: "Veterinary Medicine" },
                { name: "Education" },
                { name: "Languages" },
                { name: "Art" },
                { name: "Music" },
                { name: "Sports" },
                { name: "Other" },
            ]
        });

        console.log("Seeding finished.");
        
    } catch (error) {
        console.log(" Error seeding the database categories", error);
    } finally{
        await database.$disconnect();
    }
}

main();

// Run command to seed the database
// npx ts-node scripts/seed.ts