import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
    const navigate = useNavigate();
    const { productID } = useParams();

    const [productName, setProductName] = useState("Gold Standard 100% Whey");
    const [cost, setCost] = useState("34.99");
    const [brandID, setBrandID] = useState("2");
    const [proteinTypeID, setProteinTypeID] = useState("1");
    const [flavorID, setFlavorID] = useState("2");
    const [stockQuantity, setStockQuantity] = useState("50");

    const brands = [
        { id: 1, name: "Legion" },
        { id: 2, name: "Optimum Nutrition" },
        { id: 3, name: "Transparent Labs" },
        { id: 4, name: "Dynamatize" },
        { id: 5, name: "Garden of Life" }
    ];
    const proteinTypes = [
        { id: 1, type: "Whey" },
        { id: 2, type: "Casein" },
        { id: 3, type: "Pea" },
        { id: 4, type: "Soy" },
        { id: 5, type: "Egg" }
    ];
    const flavors = [
        { id: 1, name: "Vanilla" },
        { id: 2, name: "Chocolate" },
        { id: 3, name: "Cookies & Cream" },
        { id: 4, name: "Salted Caramel" },
        { id: 5, name: "Unflavored" }
    ];

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/products");
    }

    return (
        <main className="form-page">
            <button
                className="back-button"
                type="button"
                onClick={() => navigate("/products")}
            >
                ← Back to Products
            </button>

            <section className="form-card">
                <div className="form-card-header">
                    <h1>Edit Product</h1>
                    <p>Update the product details and inventory information below.</p>
                </div>

                <form className="customer-form product-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            required
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>

                    <div className="product-form-row">
                        <div className="form-field">
                            <label htmlFor="cost">Cost</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                id="cost"
                                value={cost}
                                required
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="stockQuantity">Inventory</label>
                            <input
                                type="number"
                                min="0"
                                step="1"
                                id="stockQuantity"
                                value={stockQuantity}
                                required
                                onChange={(e) => setStockQuantity(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="brandID">Brand</label>
                        <select
                            id="brandID"
                            value={brandID}
                            required
                            onChange={(e) => setBrandID(e.target.value)}
                        >
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>{brand.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field">
                        <label htmlFor="proteinTypeID">Protein Type</label>
                        <select
                            id="proteinTypeID"
                            value={proteinTypeID}
                            required
                            onChange={(e) => setProteinTypeID(e.target.value)}
                        >
                            {proteinTypes.map((protein) => (
                                <option key={protein.id} value={protein.id}>{protein.type}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-field">
                        <label htmlFor="flavorID">Flavor</label>
                        <select
                            id="flavorID"
                            value={flavorID}
                            required
                            onChange={(e) => setFlavorID(e.target.value)}
                        >
                            {flavors.map((flavor) => (
                                <option key={flavor.id} value={flavor.id}>{flavor.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-actions">
                        <button
                            className="cancel-button"
                            type="button"
                            onClick={() => navigate("/products")}
                        >
                            Cancel
                        </button>
                        <button className="submit-button" type="submit">
                            Save Changes
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default EditProduct;
