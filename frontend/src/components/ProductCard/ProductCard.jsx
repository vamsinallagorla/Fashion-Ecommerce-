import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./ProductCard.css";

function ProductCard({ id, name, price, category, image, description }) {
    const { addToCart } = useContext(CartContext);
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!isLoggedIn) {
            navigate("/login", { state: { from: "/cart" } });
            return;
        }

        addToCart({ id, name, price, category, image, description });
        navigate("/cart");
    };
    const handleOrderNow = () => {
    if (!isLoggedIn) {
        navigate("/login", { state: { from: "/summary" } });
        return;
    }

    addToCart({
        id,
        name,
        price,
        category,
        image,
        description,
    });

    navigate("/summary");
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
                <div className="button-group">
                    <div className="button-group">

                        <button
                            className="order-btn"
                            onClick={handleOrderNow}
                        >
                            Order Now
                        </button>

                        <button
                            className="cart-btn"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>

</div>

</div>
            </div>
        </div>
    );
}

export default ProductCard;