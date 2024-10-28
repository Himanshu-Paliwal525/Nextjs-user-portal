"use client";
import { signIn } from "next-auth/react";
export default function SignupPage() {

    return <button onClick={async () => await signIn('google')} className="bg-blue-500 text-white hover:bg-blue-700 rounded-md px-2 py-1 w-full my-2">Sign up with Google</button>;
}
