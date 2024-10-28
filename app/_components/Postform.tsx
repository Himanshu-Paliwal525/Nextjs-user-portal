"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface FormDataType {
    title: string;
    content: string;
}

interface PostDataType {
    id: number;
    title: string;
    content: string;
}

interface CreatePostProps {
    setAllPostsCreated: (posts: PostDataType[]) => void;
}

export default function CreatePost({ setAllPostsCreated }: CreatePostProps) {
    const [formData, setFormData] = useState<FormDataType>({
        title: "",
        content: "",
    });
    const { data: session } = useSession();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Your are inside handleSubmit')
        if (!session?.user?.id) {
            alert("You must be signed in to create a post.");
            return;
        }

        try {
            const response = await fetch("/api/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: formData.title,
                    content: formData.content,
                }),
            });

            if (response.ok) {
                alert("Post created successfully!");
                
                const updatedPosts = await fetch("api/posts", { method: "GET" });
                const postsData = await updatedPosts.json();
                setAllPostsCreated(postsData);
                
                setFormData({ title: "", content: "" });
            } else {
                throw new Error("Failed to create post");
            }
        } catch (error) {
            console.error(error);
            alert("There was an error creating the post. Please try again.");
        }
    };

    return (
        <div className="mt-4">
            <h1>Create a New Post</h1>
            <form
                className="flex flex-col items-center gap-2"
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Title"
                    className="border px-2 py-1 border-black rounded-md"
                    value={formData.title}
                    onChange={handleChange}
                    name="title"
                />
                <textarea
                    placeholder="Content"
                    name="content"
                    cols={40}
                    rows={5}
                    className="border px-2 py-1 border-black rounded-md"
                    onChange={handleChange}
                    value={formData.content}
                />
                <button
                    type="submit"
                    className="bg-blue-500 mb-2 hover:bg-blue-700 text-white px-2 py-1 rounded-md"
                >
                    Save
                </button>
            </form>
        </div>
    );
}
