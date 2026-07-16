import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Products from "./pages/Products/Products";
import OrderDetailsPage from "./pages/OrderDetailsPage/OrderDetailsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "./pages/CartPage/CartPage";
import OrderSummaryPage from "./pages/OrderSummaryPage/OrderSummaryPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Member 2 Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<Products />} />
        <Route path="/order-details" element={<OrderDetailsPage />}/>
        
        {/* Member 3 Pages */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/summary" element={<OrderSummaryPage />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;