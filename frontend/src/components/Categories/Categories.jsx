import "./Categories.css";

function Categories() {
    return (
        <section className="categories">
            <h2>Shop by Category</h2>
            <div className="category-container">
                <div className="category-card">
                    <h3>Men</h3>
                </div>
                <div className="category-card">
                    <h3>Women</h3>
                </div>
                <div className="category-card">
                    <h3>Accessories</h3>
                </div>
            </div>
        </section>
    );
}

export default Categories;