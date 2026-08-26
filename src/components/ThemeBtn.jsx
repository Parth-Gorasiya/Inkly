import React from "react";
import { useTheme } from "../context/ThemeContext";

function ThemeBtn() {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const onChangeBtn = (e) => {
        if (e.currentTarget.checked) {
            darkTheme();
        } else {
            lightTheme();
        }
    };

    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                className="sr-only peer"
                checked={themeMode === "dark"}
                onChange={onChangeBtn}
            />

            <div className="w-11 h-6 bg-gray-300 rounded-full
                peer-checked:bg-gray-700
                peer-focus:outline-none">

                <div className="w-5 h-5 bg-white rounded-full
                    translate-x-0.5 translate-y-0.5
                    peer-checked:translate-x-5
                    transition-transform">
                </div>

            </div>

            <span className="ml-2 text-sm font-medium">
                {themeMode === "dark" ? "Dark" : "Light"}
            </span>
        </label>
    );
}

export default ThemeBtn;