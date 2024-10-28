"use client";
type PostProps = {
    title: string;
    content: string;
};
export default function Post({ title, content }: PostProps) {
    return (
        <div className="hover:bg-gray-300 border-2 rounded-md border-black py-4 px-2 mx-4">
            <h1 className="text-xl font-bold mb-2">{title}</h1>
            <p>{content}</p>
        </div>
    );
}
