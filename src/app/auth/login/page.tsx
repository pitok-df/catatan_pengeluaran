import LoginForm from "@/app/components/auth/LoginForm";
import LoginGoogle from "@/app/components/auth/loginGoogle";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login PecPan - Pencatatan Pengeluaran",
    description: "Masuk ke akun Anda untuk mulai mencatat pengeluaran dengan mudah dan cepat.",
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
    openGraph: {
        title: "Login PecPan",
        description: "Masuk ke akun Anda untuk mulai mencatat pengeluaran dengan mudah dan cepat.",
        url: "https://catatan-pengeluaran-three.vercel.app/auth/login",
        type: "website",
        images: [
            {
                url: "https://catatan-pengeluaran-three.vercel.app/logo.png",
                width: 800,
                height: 600,
                alt: "Logo PecPan"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Login PecPan",
        description: "Masuk ke akun Anda untuk mulai mencatat pengeluaran dengan mudah dan cepat.",
        images: ["https://catatan-pengeluaran-three.vercel.app/logo.png"]
    }
};

export default function login() {
    return (
        <div className="flex flex-col bg-gray-50 h-screen items-center justify-center dark:bg-gray-900">
            <main className="w-full sm:w-96 bg-white text-black dark:text-white dark:bg-gray-700 p-6 rounded-lg" aria-label="Login form container">
                <header>
                    <h1 className="text-xl font-bold text-center mb-10">Login to Your Account</h1>
                </header>
                <LoginForm />
                <LoginGoogle />
                <footer>
                    <p className="mt-6">
                        Not registered? 
                        <Link className="text-blue-500 ms-2" href="/auth/register" title="Go to registration page">
                            Register here.
                        </Link>
                    </p>
                </footer>
            </main>
        </div>
    );
}

