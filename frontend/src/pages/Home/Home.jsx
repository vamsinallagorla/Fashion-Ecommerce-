import "./Home.css"
import Hero from "../../components/Hero/Hero";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";

function Home() {
    return(
        <div className="home">
            <Hero />
            <FeaturedProducts />
            <Footer />
        </div>
    );
}

export default Home;