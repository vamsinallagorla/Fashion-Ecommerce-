import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const placeOrder = () => {
    alert("🎉 Order Placed Successfully!");

    clearCart();

    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="summary-container">

        <h1>Order Summary</h1>

        <div className="empty-summary">
          <h2>No Products Found</h2>

          <p>Your cart is empty.</p>

          <Link to="/">
            <button className="place-order-btn">
              Continue Shopping
            </button>
          </Link>
        </div>

      </div>
    );
  }

  return (
    <div className="summary-container">

      <h1 className="summary-title">
        Order Summary
      </h1>

      <div className="summary-box">

        {cartItems.map((item) => (
          <div className="summary-item" key={item.id}>

            <img
              src={item.image}
              alt={item.name}
            />

            <div className="summary-details">

              <h3>{item.name}</h3>

              <p>{item.category}</p>

              <p>
                ₹ {item.price} × {item.quantity}
              </p>

            </div>

            <h3>
              ₹ {item.price * item.quantity}
            </h3>

          </div>
        ))}

        <hr />

        <div className="summary-row">
          <span>Total Items</span>

          <span>{totalItems}</span>
        </div>

        <div className="summary-row">
          <span>Subtotal</span>

          <span>₹ {totalPrice}</span>
        </div>

        <div className="summary-row">
          <span>Delivery Charge</span>

          <span>FREE</span>
        </div>

        <div className="summary-total">
          <span>Grand Total</span>

          <span>₹ {totalPrice}</span>
        </div>

        <button
          className="place-order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  );
};

export default OrderSummary;