import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import { useEffect, useState } from "react";
import api from "../../services/api";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async()=>{
            try{
                const response=await api.get("/products");
                setProducts(response.data);
            }catch(error){
                console.error("Error fetching products:",error);
            }finally{
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    if(loading){
        return <h2>Loading Products...</h2>
    }

    return(
        <div className="products">
            <h1>Our Products</h1>
            <div className="product-grid">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
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