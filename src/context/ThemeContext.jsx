import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [themeMode, setThemeMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
});

    const lightTheme = () => {
        setThemeMode("light");
    };

    const darkTheme = () => {
        setThemeMode("dark");
    };

    useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("light", "dark");
    html.classList.add(themeMode);

    localStorage.setItem("themeMode", themeMode);
}, [themeMode]);

    return (
        <ThemeContext.Provider
            value={{
                themeMode,
                lightTheme,
                darkTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}