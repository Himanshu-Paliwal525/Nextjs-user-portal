import { PrismaClient } from "@prisma/client";

const mainPrisma = new PrismaClient({
  datasources: {
    db: { url: process.env.DATABASE_URL }, 
  },
});

export async function createUserDatabase(userId: string) {
  const userDbName = `${userId}`;

  await mainPrisma.$executeRawUnsafe(`CREATE DATABASE "${userDbName}"`);

  const userPrisma = new PrismaClient({
    datasources: {
      db: { url: `${process.env.LOCAL_DB}/${userDbName}` },
    },
  });

  // Create the "Post" table
  await userPrisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Post" (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await userPrisma.$disconnect();
  await mainPrisma.$disconnect();
}
