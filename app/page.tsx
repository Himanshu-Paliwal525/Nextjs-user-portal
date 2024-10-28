"use client";
import LoginPage from "./_components/Login";
import SignupPage from "./_components/signup";

export default function Home() {
    return (<>
        <div className="flex justify-center items-center h-screen">
            <div>
                <i className="text-gray-700">Currently only Signup with google is active...</i>
                <LoginPage />
                <SignupPage />
            </div>
        </div>
    </>
    );
}
