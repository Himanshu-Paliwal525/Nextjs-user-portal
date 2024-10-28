import { PrismaClient } from "@prisma/client";

export function getUserDatabase(userId: string) {
    const userDbName = `${userId}`; 
    const dbUrl = `postgresql://himanshu:0202@localhost:5432/${userDbName}`; 
    const userDb = new PrismaClient({
        datasources: {
            db: {
                url: dbUrl,
            },
        },
    });
    return userDb;
}
