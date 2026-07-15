import "./Login.css";
import {useAuth} from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        login();
        navigate("/");
    };
    return (
        <div className="login-page">
            <form className="login-form">
                <h2>Login</h2>
                <input type="email" placeholder="Enter Email" required />
                <input type="password" placeholder="Enter Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;