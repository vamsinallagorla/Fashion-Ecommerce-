import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../services/api";
import "./OrderSummary.css";

const OrderSummary = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { isLoggedIn, currentUser } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateCustomerInfo = () => {
    const nextErrors = {};

    if (!customerInfo.name.trim()) {
      nextErrors.name = "Name is required.";
    }

    if (!/^\d{10}$/.test(customerInfo.mobile.trim())) {
      nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!customerInfo.address.trim()) {
      nextErrors.address = "Address is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/summary" } });
      return;
    }

    if (!validateCustomerInfo()) {
      return;
    }

    const orderPayload = {
      name: customerInfo.name.trim(),
      mobile: customerInfo.mobile.trim(),
      address: customerInfo.address.trim(),

      user: currentUser?.id,

      products: cartItems.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category,
    image: item.image,
    quantity: item.quantity
})),

      totalAmount: totalPrice,
    };

    try {
      const response = await createOrder(orderPayload);
      const savedOrder = response.order || {
        ...orderPayload,
        id: Date.now().toString(),
        placedAt: new Date().toISOString(),
        status: "success",
      };

      window.localStorage.setItem("fashion-latest-order", JSON.stringify(savedOrder));

      try {
        const previousOrders = JSON.parse(window.localStorage.getItem("fashion-orders") || "[]");
        const nextOrders = [...previousOrders, { ...savedOrder, status: "success" }];
        window.localStorage.setItem("fashion-orders", JSON.stringify(nextOrders));
      } catch {
        // ignore storage issues and continue to the confirmation screen
      }

      

      clearCart();

      navigate("/orders", {
        state: {
          order: response.order,
  },
});
    } catch (error) {
      alert(error.response?.data?.message || "Unable to place order right now.");
    }
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

        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Delivery Details</h3>
          <div className="checkout-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={customerInfo.name}
              onChange={handleCustomerInfoChange}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="checkout-field">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              name="mobile"
              type="tel"
              value={customerInfo.mobile}
              onChange={handleCustomerInfoChange}
              placeholder="Enter 10-digit mobile number"
            />
            {errors.mobile && <p className="field-error">{errors.mobile}</p>}
          </div>

          <div className="checkout-field">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows="3"
              value={customerInfo.address}
              onChange={handleCustomerInfoChange}
              placeholder="Enter delivery address"
            />
            {errors.address && <p className="field-error">{errors.address}</p>}
          </div>

          <div className="payment-section">
            <h3>Payment Method</h3>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Credit / Debit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <div className="summary-total">
            <span>Grand Total</span>

            <span>₹ {totalPrice}</span>
          </div>

          <button className="place-order-btn" type="submit">
            Place Order
          </button>
        </form>

      </div>

    </div>
  );
};

export default OrderSummary;