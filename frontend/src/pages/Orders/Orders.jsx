import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import "./Orders.css";

function Orders() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");

        const data = await response.json();

        if (response.ok) {
          setOrders(data);
        } else {
          setError("Unable to load orders");
        }
      } catch (err) {
        setError("Server Error");
      }
    };

    fetchOrders();
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Navbar />

      <main className="orders-page">
        <div className="orders-card">

          <div className="orders-header">
            <h1>My Orders</h1>

            <button
              className="ghost-btn"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>

          {error && <p>{error}</p>}

          {orders.length === 0 ? (
            <h2>No Orders Found</h2>
          ) : (
            <div className="orders-list">

              {orders.map((order) => (
                <div className="order-box" key={order._id}>

                  <h2>Order Details</h2>

                  <p>
                    <strong>Name :</strong> {order.name}
                  </p>

                  <p>
                    <strong>Mobile :</strong> {order.mobile}
                  </p>

                  <p>
                    <strong>Address :</strong> {order.address}
                  </p>

                  <p>
                    <strong>Status :</strong> {order.status}
                  </p>

                  <p>
                    <strong>Total Amount :</strong> ₹ {order.totalAmount}
                  </p>

                  <p>
                    <strong>Date :</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                  <hr />

                  <h3>Products</h3>

                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="product-card"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        width="80"
                        height="80"
                      />

                      <div>
                        <h4>{item.name}</h4>

                        <p>
                          Category : {item.category}
                        </p>

                        <p>
                          Price : ₹ {item.price}
                        </p>

                        <p>
                          Quantity : {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              ))}

            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Orders;