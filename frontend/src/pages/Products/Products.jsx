import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import localProducts from "../../data/products";
import { getAllProducts } from "../../services/api";
import "./Products.css";


function Products() {
  
   const [products, setProducts] = useState([]);
  

  useEffect(() => {

  const fetchProducts = async () => {

    try {

      const data = await getAllProducts();

      console.log("MongoDB Products:", data);

      const allProducts = [
        ...localProducts,
        ...data
      ];

      setProducts(allProducts);

    } catch(error) {

      console.log("Error fetching products:", error);

      // If database fails, show local products
      setProducts(localProducts);

    }

  };

  fetchProducts();

}, []);
  
  
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const selectedCategory = query.get("category") || "All";
  

  const productCategories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <div className="products">

      {/* Navigation Bar */}
      <div className="products-navbar">

        <button
          className="nav-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/")}
        >
           Home
        </button>

        <button
          className="nav-btn"
          onClick={() => navigate("/cart")}
        >
           Cart
        </button>

      </div>

      <h1>Our Products</h1>

      <div className="product-filters">
        {productCategories.map((category) => {
          const categoryClass = category
            .toLowerCase()
            .replace(/\s+/g, "-");

          return (
            <Link
              key={category}
              to={
                category === "All"
                  ? "/products"
                  : `/products?category=${encodeURIComponent(category)}`
              }
              className={`filter-pill ${categoryClass} ${
                category === selectedCategory ? "active" : ""
              }`}
            >
              <span className="pill-label">
                {category}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="product-grid">

  {filteredProducts.map((product) => (

    <ProductCard
      key={product._id || product.id}
      id={product._id || product.id}
      name={product.name}
      price={product.price}
      category={product.category}
      image={product.image}
      description={product.description}
    />

  ))}

</div>

    </div>
  );
}

export default Products;