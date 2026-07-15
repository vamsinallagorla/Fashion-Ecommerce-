import "./ProductCard.css";
// import { useAuth } from "../../context/AuthContext";
// import { useNavigate } from "react-router-dom";

function ProductCard({ name, price, category, image }) {
    // const { isAuthenticated} = useAuth();
    // const navigate = useNavigate();
    // const handleAddToCart = () => {
    //     if(!isAuthenticated){
    //         alert("please login first");
    //         navigate("/login");
    //         return;
    //     }
    //     alert("Product added to cart");
    // }
    return (
        <div className="card">
            <div className="badge">NEW</div>
            <img src={image} alt={name} />
            <div className="card-content">
                <h2>{name}</h2>
                <p>{category}</p>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <h3>$ {price}</h3>
                <button className="cart-btn">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;