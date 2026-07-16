import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./ProductCard.css";

function ProductCard({ id, name, price, category, image, description }) {
    const { addToCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart({ id, name, price, category, image, description });
        navigate("/cart");
    };

    return (
        <div className="card">
            <div className="badge">NEW</div>
            <Link to={`/product/${id}`}>
                <img src={image} alt={name} />
            </Link>
            <div className="card-content">
                <Link className="product-link" to={`/product/${id}`}>
                    <h2>{name}</h2>
                </Link>
                <p>{category}</p>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <h3>₹ {price}</h3>
                <button className="cart-btn" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;