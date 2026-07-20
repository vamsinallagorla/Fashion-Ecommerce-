import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useContext(CartContext);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCheckout = () => {
    const token = localStorage.getItem("fashion-auth-token");

    if (token) {
      navigate("/summary");
    } else {
      navigate("/login", {
        state: {
          from: "/summary",
        },
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>

        <div className="empty-cart">
          <h2>Your Cart is Empty 🛒</h2>
          <p>Add some products to continue shopping.</p>

          <Link to="/">
            <button className="checkout-btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="cart-title">
        Shopping Cart
      </h1>

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      ))}

      <div className="cart-summary">
        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="summary-row">
          <span>Delivery Charge</span>
          <span>FREE</span>
        </div>

        <div className="summary-row">
          <span>Discount</span>
          <span>₹0</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Total Amount</span>
          <span>₹ {totalPrice}</span>
        </div>

        <button
          className="checkout-btn"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;