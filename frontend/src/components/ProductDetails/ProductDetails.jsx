import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./ProductDetails.css";

const ProductDetails = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleAddToCart = () => {
    // Allow guest users to add products to cart
    addToCart(product);

    // Redirect to cart page
    navigate("/cart");
  };

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="category">
          Category:
          <span> {product.category}</span>
        </p>

        <h2 className="price">₹ {product.price}</h2>

        <p className="description">
          {product.description}
        </p>

        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;