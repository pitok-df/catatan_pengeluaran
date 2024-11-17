'use client'

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useEffect, useState } from "react";
import Loading from "../loading";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [isPageLoaded, setIsPageLoaded] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setIsPageLoaded(true); // Menghilangkan halaman loading
        };

        // Tambahkan event listener untuk mendeteksi halaman selesai dimuat
        if (document.readyState === "complete") {
            handleLoad(); // Jika sudah loaded sebelum listener
        } else {
            window.addEventListener("load", handleLoad);
        }

        // Bersihkan listener saat komponen unmount
        return () => {
            window.removeEventListener("load", handleLoad);
        };
    }, []);
    return (
        !isPageLoaded ? <Loading /> :
            <ThemeProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ThemeProvider>
    )
}