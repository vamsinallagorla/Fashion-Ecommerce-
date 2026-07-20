import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import ProductDetails from "../../components/ProductDetails/ProductDetails";
import products from "../../data/products";

import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const item = products.find((p) => p.id === Number(id));
    setProduct(item || null);
  }, [id]);

  return (
    <>
      <main className="product-page">
        <div className="product-container">
          {product ? <ProductDetails product={product} /> : <h2>Product not found</h2>}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailsPage;