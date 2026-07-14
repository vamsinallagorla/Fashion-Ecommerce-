import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar(){
    return (
        <nav className="navbar">
            <h2>Fashion Boutique</h2>

            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;