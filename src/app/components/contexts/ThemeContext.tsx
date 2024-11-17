import React, { createContext, useState, useEffect, useContext } from "react";

// Definisi context
const ThemeContext = createContext({
    theme: "dark", // Default tema
    setTheme: (theme: string) => { }, // Function untuk mengubah tema
});

// Provider untuk membungkus aplikasi
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const systemTheme = typeof window != "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : 'light' : '';
    const savedTheme = typeof window != "undefined" ? localStorage.getItem("theme") || systemTheme : ''
    const [theme, setTheme] = useState(savedTheme);

    // Persist tema dengan localStorage
    useEffect(() => {
        setTheme(savedTheme);
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, [savedTheme]);

    // Update tema di DOM dan localStorage
    const updateTheme = (newTheme: string) => {
        setTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook untuk akses context
export const useTheme = () => useContext(ThemeContext);
