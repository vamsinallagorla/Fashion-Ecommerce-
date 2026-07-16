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
              <div className="details-grid">
                <section className="details-section">
                  <h2>Delivery details</h2>
                  <p><strong>Name:</strong> {order.customer?.name || "-"}</p>
                  <p><strong>Mobile:</strong> {order.customer?.mobile || "-"}</p>
                  <p><strong>Address:</strong> {order.customer?.address || "-"}</p>
                </section>

                <section className="details-section">
                  <h2>Payment</h2>
                  <p><strong>Method:</strong> {order.paymentMethod || "-"}</p>
                  <p><strong>Total:</strong> ₹ {order.totalPrice || 0}</p>
                  <p><strong>Placed on:</strong> {order.placedAt ? new Date(order.placedAt).toLocaleString() : "-"}</p>
                </section>
              </div>

              <section className="details-section">
                <h2>Items</h2>
                <ul className="item-list">
                  {(order.items || []).map((item, index) => (
                    <li key={`${item.id || item.name}-${index}`}>
                      <span>{item.name}</span>
                      <span>₹ {item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderDetailsPage;