import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProductDetails from "../../components/ProductDetails/ProductDetails";

import "./ProductDetailsPage.css";

const ProductDetailsPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const products = [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        category: "Men Fashion",
        price: 799,
        description:
          "Premium quality cotton T-Shirt with modern fit and comfortable fabric.",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700",
      },
    ];

    const item = products.find((p) => p.id === Number(id)) || products[0];

    setProduct(item);
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="product-page">
        <div className="product-container">
          {product && <ProductDetails product={product} />}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default ProductDetailsPage;