import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    totalPrice,
  } = useContext(CartContext);

  // Calculate total quantity
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Empty Cart
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

      {/* Cart Items */}

      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
        />
      ))}

      {/* Order Summary */}

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

        <Link to="/summary">
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </Link>

      </div>

    </div>
  );
};

export default Cart;