import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
    { title: "Men Fashion", value: "Men Fashion" },
    { title: "Women Fashion", value: "Women Fashion" },
    { title: "Accessories", value: "Accessories" },
    { title: "Grooming", value: "Grooming" },
];

function Categories() {
    return (
        <section className="categories">
            <h2>Shop by Category</h2>
            <div className="category-container">
                {categories.map((category) => (
                    <Link
                        key={category.value}
                        to={`/products?category=${encodeURIComponent(category.value)}`}
                        className="category-card"
                    >
                        <h3>{category.title}</h3>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default Categories;