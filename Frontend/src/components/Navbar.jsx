import React, { useState } from "react";
import { logoutSuccess } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth?.user);
    const isLoggedIn = !!user;

    const handleLogout = () => {
        dispatch(logoutSuccess());
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                {/* Logo / Brand Name */}
                <a
                    href="/"
                    className="text-2xl font-bold text-indigo-700 hover:text-indigo-800 transition-colors"
                >
                    DocuVault
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 items-center">
                    <a
                        href="/"
                        className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                    >
                        Home
                    </a>
                    <a
                        href="/profile"
                        className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                    >
                        Profile
                    </a>

                    {!isLoggedIn ? (
                        <>
                            <a
                                href="/register"
                                className="text-gray-700 hover:text-indigo-600 transition-colors font-medium"
                            >
                                Register
                            </a>
                            <a
                                href="/login"
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-transform active:scale-95"
                            >
                                Login
                            </a>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-transform active:scale-95"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
