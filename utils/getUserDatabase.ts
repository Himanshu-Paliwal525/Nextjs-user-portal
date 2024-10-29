import { PrismaClient } from "@prisma/client";

export function getUserDatabase(userId: string) {
    const userDbName = `${userId}`; 
    const dbUrl = `${process.env.LOCAL_DB}/${userDbName}`; 
    const userDb = new PrismaClient({
        datasources: {
            db: {
                url: dbUrl,
            },
        },
    });
    return userDb;
}
