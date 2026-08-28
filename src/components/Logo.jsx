import React from "react";
import logo from "../assets/inkly-logo.png";

function Logo({ width = "120px", className = "" }) {
    return (
        <img
            src={logo}
            alt="Inkly"
            style={{ width }}
            className={className}
        />
    );
}

export default Logo;