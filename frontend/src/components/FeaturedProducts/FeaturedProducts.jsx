import "./FeaturedProducts.css";

import ProductCard from "../ProductCard/ProductCard";
import products from "../../data/products";

function FeaturedProducts() {
    return (
        <section className="featured">
            <h2>Featured Products</h2>
            <div className="featured-grid">
                {products.slice(0, 3).map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                        description={product.description}
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturedProducts;