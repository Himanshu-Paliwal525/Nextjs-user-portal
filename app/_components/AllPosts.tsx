"use client";
import { useEffect } from "react";
import Post from "./Post";
import { useSession } from "next-auth/react";

interface PostDataType {
    id: number;
    title: string;
    content: string;
}

interface AllPostsProps {
    setAllPostsCreated: (posts: PostDataType[]) => void;
    allPostsCreated: PostDataType[];
}

export default function AllPosts({ setAllPostsCreated, allPostsCreated }: AllPostsProps) {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated" && session?.user?.id) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch(`/api/posts`, {
                        method: "GET",
                    });

                    if (!response.ok) {
                        console.error("Error fetching posts, response is not ok");
                        return;
                    }

                    const data = await response.json();
                    setAllPostsCreated(data);
                } catch (error) {
                    console.error("Failed to fetch posts:", error);
                }
            };

            console.log("User is authenticated, fetching user-specific posts");
            fetchPosts();
        }
    }, [status, session?.user?.id, setAllPostsCreated]);

    const posts = allPostsCreated.map((post) => (
        <div key={post.id} className="flex flex-col gap-2">
            <Post title={post.title} content={post.content} />
        </div>
    ));

    return <div className="mt-10">{posts}</div>;
}
