import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Cart from "../../components/Cart/Cart";

import "./CartPage.css";

const CartPage = () => {
  return (
    <>
      <Navbar />

      <main className="cart-page">
        <div className="cart-page-container">
          <div className="cart-header">
            <h1>Shopping Cart</h1>
            <p>Review your selected products before checkout.</p>
          </div>

          <Cart />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default CartPage;