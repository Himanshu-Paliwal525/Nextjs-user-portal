import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { createUserDatabase } from "@/utils/createUserDatabase"; // Utility function

const prisma = new PrismaClient();

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name: string;
            email: string;
        };
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user }) {
            try {
                let existingUser = await prisma.User.findUnique({
                    where: { email: user.email },
                });

                if (!existingUser) {
                    existingUser = await prisma.User.create({
                        data: {
                            email: user.email,
                            name: user.name,
                        },
                    });
                    await createUserDatabase(existingUser.id);
                    console.log("User and database created successfully");
                }

                return true;
            } catch (error) {
                console.error("Error during sign-in and setup:", error);
                return false; 
            }
        },
        async jwt({ token, user }) {
            if (user) {
                const existingUser = await prisma.User.findUnique({
                    where: { email: user.email },
                });
                if (existingUser) {
                    token.id = existingUser.id;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            if (url === "/") {
                return baseUrl;
            }
            return `${baseUrl}/posts`;
        },
    },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
