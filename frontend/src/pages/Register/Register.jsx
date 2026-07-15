import "./Register.css";

function Register() {
    return (
        <div className="register-page">
            <form className="register-form">
                <h2>Create Account</h2>
                <input type="text" placeholder="Enter Name" />
                <input type="email" placeholder="Enter Email" />
                <input type="password" placeholder="Enter Password" />
                <input type="password" placeholder="Confirm Password" />
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;