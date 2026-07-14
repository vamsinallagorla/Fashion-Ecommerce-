import "./FeaturedProducts.css";

import ProductCard from "../ProductCard/ProductCard";

import tshirt from "../../assets/images/tshirt.jpg";
import shoes from "../../assets/images/shoes.jpg";
import bag from "../../assets/images/bag.jpg";

function FeaturedProducts() {
    const featuredProducts = [
        { 
            id: 1,
            name: "Men's T-Shirt",
            price: 799,
            category: "Clothing",
            image: tshirt
        },
        { 
            id: 2,
            name: "Sports Shoes",
            price: 2499,
            category: "Footwear",
            image: shoes
        },
        { 
            id: 3,
            name: "Leather Bag",
            price: 1899,
            category: "Accessories",
            image: bag
        }
    ];

    return (
        <section className="featured">
            <h2>Featured Products</h2>
            <div className="featured-grid">
                {featuredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturedProducts;