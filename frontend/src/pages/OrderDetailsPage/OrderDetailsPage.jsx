import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const savedOrder = window.localStorage.getItem("fashion-latest-order");
      if (savedOrder) {
        setOrder(JSON.parse(savedOrder));
      }
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main className="order-details-page">
        <div className="order-details-card">
          <div className="order-details-header">
            <div>
              <p className="eyebrow">Order confirmed</p>
              <h1>Thank you for your order</h1>
            </div>
            <div className="order-details-actions">
              <button type="button" className="ghost-btn" onClick={() => navigate("/orders")}>View Orders</button>
              <button type="button" className="ghost-btn" onClick={() => navigate("/")}>Home</button>
            </div>
          </div>

          {!order ? (
            <div className="order-empty-state">
              <h2>Your order details will appear here.</h2>
              <p>Place an order to see a summary and shipment details.</p>
            </div>
          ) : (
            <>
                <div className="success-box">

                  <h1>✅ Order Placed Successfully</h1>

                </div>
              <div className="details-grid">
                <section className="details-section">
                    <h2>Customer Details</h2>

                    <p><strong>Order ID :</strong> {order._id || order.id}</p>

                    <p><strong>Customer Name :</strong> {order.name}</p>

                    <p><strong>Mobile Number :</strong> {order.mobile}</p>

                    <p><strong>Delivery Address :</strong> {order.address}</p>

                    <p><strong>Order Status :</strong> {order.status}</p>
                  </section>

                <section className="details-section">

                    <h2>Order Summary</h2>

                    <p>
                      <strong>Total Amount :</strong>
                      ₹ {order.totalAmount}
                    </p>

                    <p>
                      <strong>Date :</strong>
                      {new Date(order.createdAt || order.placedAt).toLocaleString()}
                    </p>

                  </section>
              </div>

              <section className="details-section">
                <h2>Items</h2>
                <ul className="item-list">
                  {(order.products || []).map((item, index) => (
                    <li key={index}>

                      <img
                        src={item.image}
                        alt={item.name}
                        width="70"
                        height="70"
                      />

                      <div>

                        <h4>{item.name}</h4>

                        <p>Category : {item.category}</p>

                        <p>Price : ₹ {item.price}</p>

                        <p>Quantity : {item.quantity}</p>

                      </div>

                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>
        <div className="continue-btn">

          <button
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderDetailsPage;