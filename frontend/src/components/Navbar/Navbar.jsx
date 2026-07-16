import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar(){
    const{ isLoggedIn, logout} = useAuth();
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">Fashion Boutique</Link>
            </div>

            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                {isLoggedIn && (
                    <li><Link to="/orders">My Orders</Link></li>
                )}
                {!isLoggedIn && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                {isLoggedIn && (
                    <li>
                        <button className="logout-btn" onClick={logout}>
                            Logout
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;