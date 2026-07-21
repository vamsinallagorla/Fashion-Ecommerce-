import { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { isLoggedIn, currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="nav-start">
                <button
                    type="button"
                    className="menu-toggle"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Toggle navigation menu"
                >
                    ☰
                </button>

                <div className="logo">
                    <Link to="/">Fashion Boutique</Link>
                </div>
            </div>

            <div className={`nav-links ${menuOpen ? "open" : ""}`}>

                <button
                    type="button"
                    className="nav-link-btn"
                    onClick={() => handleNavigate("/")}
                >
                    Home
                </button>

                <button
                    type="button"
                    className="nav-link-btn"
                    onClick={() => handleNavigate("/products")}
                >
                    Products
                </button>

                <button
                    type="button"
                    className="nav-link-btn"
                    onClick={() => handleNavigate("/cart")}
                >
                    Cart
                </button>

                {isLoggedIn && (
                    <button
                        type="button"
                        className="nav-link-btn"
                        onClick={() => handleNavigate("/orders")}
                    >
                        My Orders
                    </button>
                )}

                {!isLoggedIn && (
                    <>
                        <button
                            type="button"
                            className="nav-link-btn"
                            onClick={() => handleNavigate("/login")}
                        >
                            Login
                        </button>

                        <button
                            type="button"
                            className="nav-link-btn"
                            onClick={() => handleNavigate("/register")}
                        >
                            Register
                        </button>
                    </>
                )}

                {isLoggedIn && (
                    <div className="user-profile">
                        <div className="user-avatar">
                            👤
                        </div>

                        <div className="user-details">
                            <h4>
                                {currentUser?.name || "User"}
                            </h4>

                            <p>
                                {currentUser?.email || ""}
                            </p>
                        </div>
                    </div>
                )}

                {isLoggedIn && (
                    <button
                        type="button"
                        className="logout-btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                )}

            </div>
        </nav>
    );
}

export default Navbar;