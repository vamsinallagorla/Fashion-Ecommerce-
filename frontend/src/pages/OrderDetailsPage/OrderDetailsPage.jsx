import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const savedOrder = localStorage.getItem("fashion-latest-order");

    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  if (!order) {
    return (
      <>
        <Navbar />

        <div className="order-details-page">
          <h2>No Order Found</h2>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="order-details-page">

        <div className="order-details-card">

          <h1 className="success-title">
            ✅ Order Placed Successfully
          </h1>

          <hr />

          <p>
            <strong>Order ID :</strong>{" "}
            {order._id || order.id}
          </p>

          <p>
            <strong>Customer Name :</strong>{" "}
            {order.name}
          </p>

          <p>
            <strong>Mobile Number :</strong>{" "}
            {order.mobile}
          </p>

          <p>
            <strong>Delivery Address :</strong>{" "}
            {order.address}
          </p>

          <p>
            <strong>Order Status :</strong>{" "}
            {order.status || "Pending"}
          </p>

          <hr />

          <h2>Products Ordered</h2>

          {order.products &&
            order.products.map((item, index) => (
              <div
                key={index}
                className="product-item"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width="80"
                  height="80"
                />

                <div>
                  <h3>{item.name}</h3>

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

          <hr />

          <h2>
            Total Amount : ₹ {order.totalAmount}
          </h2><br></br>
         
        </div><br></br>
        <button            
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
      </div>
      
      <Footer />
    </>
  );
};

export default OrderDetailsPage;