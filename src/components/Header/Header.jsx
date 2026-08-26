import React from "react";
import { Container, Logo, LogoutBtn, ThemeBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();

    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ];

    return (
        <header className="py-3 shadow-sm bg-white dark:bg-gray-900">
            <Container>
                <nav className="flex items-center">

                    <div className="mr-4">
                        <Link to="/">
                            <Logo width="70px" />
                        </Link>
                    </div>

                    <ul className="flex ml-auto items-center">

                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className="inline-block px-5 py-2 duration-200
                                        hover:bg-gray-100 dark:hover:bg-gray-800
                                        rounded-lg dark:text-white"
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}

                        {/* Dark Mode */}
                        <li className="px-3">
                            <ThemeBtn />
                        </li>

                        {/* Logout */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}

                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;