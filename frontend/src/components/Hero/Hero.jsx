import { useNavigate } from "react-router-dom";
import "./Hero.css";

function Hero() {
    const navigate = useNavigate();
    return (
        <section className="hero">
            <div className="hero-content">
                <h1>New Fashion Collection 2026</h1>
                <p>Discover the latest fashion trends for men and women</p>
                <button onClick={() => navigate("/products")}>Shop Now</button>
            </div>
        </section>
    );
}

export default Hero;