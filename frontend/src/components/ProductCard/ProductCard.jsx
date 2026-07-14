import "./ProductCard.css";

function ProductCard({ name, price, category, image }) {
    return (
        <div className="card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <p>{category}</p>
            <h3>$ {price}</h3>
            <button>View Details</button>
        </div>
    );
}

export default ProductCard;