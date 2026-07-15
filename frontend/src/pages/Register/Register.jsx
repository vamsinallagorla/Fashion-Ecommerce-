import "./Register.css";
import {useAuth} from "../../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const {register} = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async(e)=>{
        e.preventDefault();

        if(password !== confirmPassword){
            alert("passwords do not match");
            return;
        }

        try{
            const res = await axios.post("http://localhost:5000/api/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );
            alert(res.data.message);
            navigate("/login");
        }catch(error){
            alert(error.response?.data?.message || "Registration Failed");
        }
    };
    return (
        <div className="register-page">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Create Account</h2>
                <input 
                    type="text" 
                    placeholder="Enter Name" 
                    value={name}
                    onChange={(e) => 
                        setName(e.target.value)}
                />
                <input 
                    type="email" 
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=>
                        setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => 
                        setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => 
                        setConfirmPassword(e.target.value)}
                />
                <button type="submit">Register</button>
                <p className="form-link">Already have an account?
                    <span onClick={() => navigate("/login")}>
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register;