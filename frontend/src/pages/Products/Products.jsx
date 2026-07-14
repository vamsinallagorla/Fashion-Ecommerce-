import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import tshirt from "../../assets/images/tshirt.jpg";
import shoes from "../../assets/images/shoes.jpg";
import bag from "../../assets/images/bag.jpg";

function Products() {
    const products = [
        { 
        id: 1,
          name: "Men's T-Shirt",
          price: 799,
          category: "Clothing",
          image: tshirt
        },
        { 
          id: 2,
          name: "Sports Shoes",
          price: 2499,
          category: "Footwear",
          image: shoes
        },
        { 
          id: 3, 
          name: "Leather Bag", 
          price: 1899,
          category: "Accessories",
          image: bag
        },
    ];

    return(
        <div className="products">
            <h1>Our Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        category={product.category}
                        image={product.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default Products;