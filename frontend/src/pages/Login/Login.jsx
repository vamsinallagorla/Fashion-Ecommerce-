import "./Login.css";
import {useAuth} from "../../context/AuthContext";
import {useState} from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const {login} = useAuth();
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async(e) =>
    {
        e.preventDefault();
        try{
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );
            login(response.data.token);
            alert(response.data.message);
            navigate("/");
        }catch(error){
            alert(error.response?.data?.message || "Login Failed");
        }
    }
    return (
        <div className="login-page">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input type="email" 
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} required 
                />
                <input type="password" 
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required 
                />
                <button type="submit">Login</button>
                <p className="form-link">Don't have an account?
                    <span onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;