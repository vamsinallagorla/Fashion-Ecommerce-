import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import "./Orders.css";

function Orders() {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/orders", error: "Please log in to view your orders." } });
      return;
    }

    try {
      const storedOrders = JSON.parse(window.localStorage.getItem("fashion-orders") || "[]");
      const myOrders = storedOrders.filter((order) => {
        const sameUser = order.user?.email === currentUser?.email
          || order.user?.id === currentUser?.id
          || order.user?.identifier === currentUser?.identifier
          || order.user?.email === currentUser?.identifier;
        return (order.status || "success") === "success" && sameUser;
      });
      setOrders(myOrders);
    } catch {
      setError("Unable to load your orders right now.");
    }
  }, [currentUser, isLoggedIn, navigate]);

  return (
    <>
      <Navbar />
      <main className="orders-page">
        <div className="orders-card">
          <div className="orders-header">
            <div>
              <p className="eyebrow">Order history</p>
              <h1>My Orders</h1>
            </div>
            <div className="orders-actions">
              <button type="button" className="ghost-btn" onClick={() => navigate(-1)}>Previous</button>
              <button type="button" className="ghost-btn" onClick={() => navigate("/")}>Home</button>
            </div>
          </div>

          {error ? (
            <p className="orders-error">{error}</p>
          ) : orders.length === 0 ? (
            <div className="empty-orders">
              <h2>You have no orders yet.</h2>
              <p>Successful orders will appear here once you place an order.</p>
            </div>
          ) : (
            <div className="orders-table-wrap">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.id || `${order.placedAt || "order"}-${index}`}>
                      <td>
                        <div className="product-cell">
                          <strong>{(order.items || []).map((item) => `${item.name} x ${item.quantity}`).join(", ") || "-"}</strong>
                          <span>{order.customer?.address || "Shipping address available"}</span>
                        </div>
                      </td>
                      <td>₹ {order.totalPrice || 0}</td>
                      <td>{order.placedAt ? new Date(order.placedAt).toLocaleDateString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Orders;