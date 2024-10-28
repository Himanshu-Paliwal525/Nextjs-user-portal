"use client";
import AllPosts from "../_components/AllPosts";
import CreatePost from "../_components/Postform";
import Signout from "../_components/signout";
import { useState } from "react";
interface PostDataType {
    id: number;
    title: string;
    content: string;
}
export default function Page() {
    const [allPostsCreated, setAllPostsCreated] = useState<Array<PostDataType>>(
        []
    );
    return (
        <div className="my-4 mx-2">
            <div>
                <Signout />
            </div>
            Welcome, You have signed up successfully!
            <CreatePost setAllPostsCreated={setAllPostsCreated} />
            <hr />
            <AllPosts
                setAllPostsCreated={setAllPostsCreated}
                allPostsCreated={allPostsCreated}
            />
        </div>
    );
}
