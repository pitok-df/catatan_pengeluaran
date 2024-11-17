import LoginForm from "@/app/components/auth/LoginForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login",
    description: "Login Pencatatan Pengeluaran"
}

export default function login() {
    return (
        <div className="flex flex-col bg-gray-50 h-screen items-center justify-center dark:bg-gray-900">
            <div className="w-full sm:w-96 bg-white text-black dark:text-white dark:bg-gray-700 p-6 rounded-lg">
                <h1 className="text-xl font-bold text-center mb-10">Login to Your Account</h1>
                <LoginForm />
                <p className="mt-6">Not registered? <Link className="text-blue-500" href={"/auth/register"}>register here.</Link></p>
            </div>
        </div>
    );
}