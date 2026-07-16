import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!identifier.trim() || !password.trim()) {
            setError("Please enter your email  and password.");
            return;
        }

        const result = await login(identifier, password);
        if (!result.success) {
            setError(result.message);
            return;
        }

        setError("");
        const redirectTo = location.state?.from || "/";
        navigate(redirectTo);
    };

    const handleSkip = () => {
        navigate("/");
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="page-top">
                    <button type="button" className="skip-btn" onClick={handleSkip}>
                        Skip
                    </button>
                </div>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-header">
                        <h2>Login</h2>
                        <p>Sign in to access your cart and checkout faster.</p>
                    </div>
                    {error && <p className="error-text">{error}</p>}
                    <input
                        type="text"
                        placeholder="Email"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                    <p className="small-text">
                        New here? <Link to="/register">Create an account with email </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;