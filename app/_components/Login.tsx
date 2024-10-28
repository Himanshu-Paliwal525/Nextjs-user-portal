"use client";
export default function LoginPage() {
    return (
        <form className="flex flex-col justify-center items-center bg-gray-300 px-2 py-20 rounded-lg gap-8">
            <div className="flex-col flex gap-2">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-96 py-2 px-2 rounded-xl"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-96 py-2 px-2 rounded-xl"
                />
            </div>
            <div className="flex flex-col gap-2">
                <button
                    type="submit"
                    className="bg-black text-white px-3 py-1 rounded-md"
                >
                    Login
                </button>
                {/* <SignupPage /> */}
            </div>
        </form>
    );
}
