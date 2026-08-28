import React, { useId } from "react";

const Input = React.forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="block mb-1 pl-1 dark:text-white"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                className={`px-3 py-2 rounded-lg
                bg-white dark:bg-gray-800
                text-black dark:text-white
                outline-none
                focus:bg-gray-50 dark:focus:bg-gray-700
                duration-200
                border border-gray-200 dark:border-gray-700
                w-full
                ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;