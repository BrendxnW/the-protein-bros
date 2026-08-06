import { useNavigate } from "react-router-dom";
import "../index.css";

function Home() {
    const navigate = useNavigate();

    const browsePages = [
        { name: "Products", path: "/products" },
        { name: "Customers", path: "/customers" },
        { name: "Suppliers", path: "/suppliers" },
        { name: "Brands", path: "/brands" },
        { name: "Protein Types", path: "/proteintypes" },
        { name: "Flavors", path: "/flavors" },
        { name: "Invoices", path: "/invoices" }
    ];

    function resetTables() {
        const confirmed = window.confirm(
            "Warning: This action cannot be undone. Are you sure you want to reset all tables?"
        );

        if (confirmed) {
            alert("All tables have been reset.");
        }
    }

    return (
        <div className="home-container">
            <h1>The Protein Bros</h1>

            <p>
                Database-driven storefront for managing protein products,
                customers, suppliers, and invoices.
            </p>


            <h2>Browse Pages</h2>
            <p>
                Browse, add, edit, and delete products in the inventory.
            </p>

            <div className="home-buttons">
                {browsePages.map((page) => (
                    <button
                        key={page.path}
                        className="gen-button"
                        onClick={() => navigate(page.path)}
                    >
                        {page.name}
                    </button>
                ))}
            </div>

            <h2>Actions</h2>
            <p>Add a new product or create new invoices</p>

            <div className="home-buttons">
                <buttonclassName="gen-button"onClick={() => navigate("/add-product")}>Add Product</button>
                <buttonclassName="gen-button"onClick={() => navigate("/add-invoice")}>Create Invoice</button>
            </div>

            <div className="reset-section">
                <h2>Reset All Tables</h2>

                <p>
                    This action cannot be undone. All current data will be
                    permanently deleted and replaced with the default sample data.
                </p>

                <button className="delete-button" style={{ marginLeft: "32px" }} onClick={resetTables}>Reset Tables</button>
            </div>
            <p className="copyright">© 2026 The Protein Bros. Created by Brendon Wong, Tesneem El-kheir, and Alec Ilstrup.</p>
        </div>

    );
}

export default Home;