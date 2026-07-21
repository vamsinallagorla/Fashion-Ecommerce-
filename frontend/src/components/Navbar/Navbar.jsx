import { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setMenuOpen(false);
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
                <button type="button" className="nav-link-btn" onClick={() => handleNavigate("/")}>
                    Home
                </button>
                <button type="button" className="nav-link-btn" onClick={() => handleNavigate("/products")}>
                    Products
                </button>
                <button type="button" className="nav-link-btn" onClick={() => handleNavigate("/cart")}>
                    Cart
                </button>
                {isLoggedIn && (
                    <button type="button" className="nav-link-btn" onClick={() => handleNavigate("/orders")}>
                        My Orders
                    </button>
                )}
                {!isLoggedIn && (
                    <>
                        <button type="button" className="nav-link-btn" onClick={() => handleNavigate("/login")}>
                            Login
                        </button>
                        <button type="button" className="nav-link-btn" onClick={() => handleNavigate("/register")}>
                            Register
                        </button>
                    </>
                )}
                {isLoggedIn && (
                    <button type="button" className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;