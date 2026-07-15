import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import products from "../../data/products";

function Products() {
    return(
        <div className="products">
            <h1>Our Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;