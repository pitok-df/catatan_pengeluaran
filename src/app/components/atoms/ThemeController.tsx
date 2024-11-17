'use client'

import React from "react";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.checked ? "dark" : "light");
    };

    return (
        <div className="flex items-center gap-2">
            <span>Light</span>
            <input
                type="checkbox"
                className="toggle theme-controller"
                onChange={handleChange}
                checked={theme === "dark"}
            />
            <span>Dark</span>
        </div>
    );
};

export default ThemeToggle;
