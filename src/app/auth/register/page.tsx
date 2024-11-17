import RegisterForm from "@/app/components/auth/RegisterForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Register",
    description: "Register Pencatatan Pengeluaran"
}

export default function login() {
    return (
        <div className="flex flex-col bg-gray-50 h-screen items-center justify-center dark:bg-gray-900">
            <div className="w-full sm:w-96 bg-white text-black dark:text-white dark:bg-gray-700 p-6 rounded-lg">
                <h1 className="text-xl font-bold text-center mb-10">Login to Your Account</h1>
                <RegisterForm />
                <p className="mt-6">Already registered? <Link className="text-blue-500" href={"/auth/login"}>login.</Link></p>
            </div>
        </div>
    );
}