"use client";
import { signOut } from "next-auth/react";
export default function Signout() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md absolute right-10"
        >
            Sign out
        </button>
    );
}
