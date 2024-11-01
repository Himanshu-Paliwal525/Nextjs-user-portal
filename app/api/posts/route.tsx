import { getUserDatabase } from "@/utils/getUserDatabase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

async function getSession() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        throw new Error("Unauthorized");
    }
    return session.user.id;
}

export async function POST(req: Request) {
    try {
        const userId = await getSession();
        console.log("You are inside POST mode");
        const userDb = getUserDatabase(userId);

        const { title, content } = await req.json();
        console.log(title, content);

        // Use raw SQL to create the post
        await userDb.$executeRawUnsafe(`
            INSERT INTO "Post" (title, content) VALUES ($1, $2) RETURNING *
        `, title, content);
        
        // Optionally, you could fetch the created post if needed
        const createdPost = await userDb.$queryRawUnsafe(`
            SELECT * FROM "Post" WHERE title = $1 AND content = $2
        `, title, content);

        return new Response(JSON.stringify(createdPost), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating post:", error);
        return new Response(JSON.stringify({ error: "Failed to create post" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}


export async function GET() {
    try {
        const userId = await getSession();
        console.log("You are inside GET mode");
        const userDb = getUserDatabase(userId);

        const posts = await userDb.$queryRawUnsafe(`
            SELECT * FROM "Post"
        `);

        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
