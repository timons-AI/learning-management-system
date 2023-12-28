const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    // sample tokens
    await database.token.createMany({
      data: [
        { tokenCustomer: "user1", token: "token1token" },
        { tokenCustomer: "user2", token: "token2token" },
        { tokenCustomer: "user3", token: "token3token" },
        // Add more sample tokens here...
        { tokenCustomer: "user19", token: "token19token" },
      ],
    });

    console.log("Tokens have been added finished.");
  } catch (error) {
    console.log("Error seeding the database tokens", error);
  } finally {
    await database.$disconnect();
  }
}

main();

// Run command to seed the database
// node scripts/seed.ts

// model Token {
//     id            String   @id @default(uuid())
//     userId        String?
//     tokenCustomer String // this can be a user name email, or id
//     token         String   @unique
//     createdAt     DateTime @default(now())
//     updatedAt     DateTime @updatedAt
//   }
