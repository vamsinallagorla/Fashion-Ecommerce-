import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { cancelOrder, getOrders } from "../../services/api";
import "./Orders.css";

function Orders() {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [activeOrderId, setActiveOrderId] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reasonOptions = [
    "Ordered by mistake",
    "Found better price",
    "Delivery taking too long",
    "Other",
  ];

  const getOrderIdentifier = (order) => order?._id ?? order?.id ?? null;
  const normalizeOrderStatus = (status) => (status || "").toString().toLowerCase();

  const openCancelModal = (orderId) => {
    setActiveOrderId(orderId);
    setSelectedReason("");
    setCustomReason("");
    setError("");
    setNotice("");
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setActiveOrderId(null);
    setSelectedReason("");
    setCustomReason("");
  };

  const handleCancelOrder = async (event) => {
    event.preventDefault();

    if (!activeOrderId) {
      return;
    }

    const reason = selectedReason === "Other" ? customReason.trim() : selectedReason;

    if (!reason) {
      setError("Please select or enter a reason for cancellation.");
      return;
    }

    try {
      const response = await cancelOrder(activeOrderId, reason);
      const updatedOrder = response.order || response;
      const targetOrderId = getOrderIdentifier(updatedOrder) || activeOrderId;

      setOrders((previousOrders) =>
        previousOrders.map((order) => {
          const currentOrderId = getOrderIdentifier(order);

          if (String(currentOrderId) === String(activeOrderId)) {
            return {
              ...order,
              ...updatedOrder,
              _id: targetOrderId,
              id: updatedOrder.id || order.id || targetOrderId,
              status: updatedOrder.status || "Canceled",
            };
          }

          return order;
        })
      );

      window.dispatchEvent(new Event("orders:updated"));
      setNotice("Your order has been canceled.");
      setError("");
      closeCancelModal();
      navigate("/orders", { replace: true });
    } catch {
      setError("Unable to cancel order. Please try again.");
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/orders" } });
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(Array.isArray(data) ? data : []);
        setError("");
      } catch (err) {
        setError("Unable to load your orders right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    const refreshOrders = () => {
      fetchOrders();
    };

    window.addEventListener("orders:updated", refreshOrders);

    return () => {
      window.removeEventListener("orders:updated", refreshOrders);
    };
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />

      <main className="orders-page">
        <div className="orders-card">
          <div className="orders-header">
            <div>
              <p className="eyebrow">Your account</p>
              <h1>My Orders</h1>
              <p className="orders-subtitle">
                Welcome back, {currentUser?.name || "there"}. Here are your recent purchases.
              </p>
            </div>

            <div className="orders-actions">
              <button type="button" className="ghost-btn" onClick={() => navigate(-1)}>
                Previous
              </button>
              <button type="button" className="ghost-btn" onClick={() => navigate("/")}>
                Home
              </button>
            </div>
          </div>

          {error && <p className="orders-error">{error}</p>}
          {notice && <p className="orders-success">{notice}</p>}

          {loading ? (
            <div className="empty-orders">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="empty-orders">
              <h2>You have no orders yet.</h2>
              <p>Your completed purchases will appear here once you place an order.</p>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <article className={`order-card ${((order.status || "").toLowerCase() === "canceled") ? "canceled-order" : ""}`} key={order._id}>
                  <div className="order-card-header">
                    <div>
                      <p className="order-label">Order placed</p>
                      <h2>{new Date(order.createdAt).toLocaleDateString()}</h2>
                    </div>
                    <span className={`status-badge ${order.status?.toLowerCase?.() || "pending"}`}>
                      {order.status || "Pending"}
                    </span>
                  </div>

                  <div className="order-meta-grid">
                    <div>
                      <p className="order-label">Customer</p>
                      <p>{order.name}</p>
                    </div>
                    <div>
                      <p className="order-label">Mobile</p>
                      <p>{order.mobile}</p>
                    </div>
                    <div>
                      <p className="order-label">Shipping</p>
                      <p>{order.address}</p>
                    </div>
                    <div>
                      <p className="order-label">Total</p>
                      <p>₹ {order.totalAmount}</p>
                    </div>
                  </div>

                  {!["canceled", "delivered"].includes(normalizeOrderStatus(order.status)) && (
                    <button
                      type="button"
                      className="cancel-order-btn"
                      onClick={() => openCancelModal(getOrderIdentifier(order))}
                    >
                      Cancel Order
                    </button>
                  )}

                  <div className="product-list">
                    {Array.isArray(order.products) && order.products.length > 0 ? (
                      order.products.map((item, index) => (
                        <div key={`${order._id}-${index}`} className="product-card">
                          <img src={item.image} alt={item.name} />
                          <div className="product-card-details">
                            <h3>{item.name}</h3>
                            <p>{item.category}</p>
                            <p>₹ {item.price} × {item.quantity}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="product-card-details">No products listed for this order.</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {showCancelModal && (
        <div className="modal-overlay" role="dialog" aria-modal="true">
          <div className="cancel-modal">
            <h3>Are you sure you want to cancel this order?</h3>
            <p>Why are you canceling this order?</p>

            <form onSubmit={handleCancelOrder} className="cancel-form">
              <div className="reason-list">
                {reasonOptions.map((reason) => (
                  <label key={reason} className="reason-option">
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(event) => setSelectedReason(event.target.value)}
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              {selectedReason === "Other" && (
                <textarea
                  className="reason-textarea"
                  rows="3"
                  placeholder="Tell us more about your reason"
                  value={customReason}
                  onChange={(event) => setCustomReason(event.target.value)}
                />
              )}

              <div className="modal-actions">
                <button type="button" className="ghost-btn" onClick={closeCancelModal}>
                  Keep Order
                </button>
                <button type="submit" className="cancel-confirm-btn">
                  Confirm Cancellation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;