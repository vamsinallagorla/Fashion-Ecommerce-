import "./Home.css"
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Categories from "../../components/Categories/Categories";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Footer from "../../components/Footer/Footer";

function Home() {
    return(
        <div className="home">
            <Navbar />
            <Hero />
            <Categories />
            <FeaturedProducts />
            <Footer />
        </div>
    );
}

export default Home;