import Footer from "../../components/Footer/Footer";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

import "./OrderSummaryPage.css";

const OrderSummaryPage = () => {
  return (
    <>
      <main className="order-summary-page">
        <div className="order-summary-container">
          <div className="page-header">
            <h1>Order Summary</h1>
            <p>Review your order before placing it.</p>
          </div>

          <OrderSummary />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OrderSummaryPage;