import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct({ backendURL }) {
    const navigate = useNavigate();

    // Receive from backend to populate drop-downs
    const [brands, setBrands] = useState([]);
    const [proteins, setProteins] = useState([]);
    const [flavors, setFlavors] = useState([]);

    // Send to backend to create a new product
    const [productName, setProductName] = useState("");
    const [cost, setCost] = useState("");
    const [brandID, setBrandID] = useState("");
    const [proteinTypeID, setProteinTypeID] = useState("");
    const [flavorID, setFlavorID] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");

    useEffect(() => {
        fetch(`${backendURL}/add-product`)
            .then((response) => response.json())
            .then((data) => {
                setBrands(data.brands);
                setProteins(data.proteins);
                setFlavors(data.flavors);
            });
    }, [backendURL]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProduct = {
            productName,
            cost,
            brandID,
            proteinTypeID,
            flavorID,
            stockQuantity
        };
        const response = await fetch(`${backendURL}/add-product`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newProduct)
        });
        if (response.status === 200) {
            alert("Added new product");
        } else {
            alert(`Failed to add new product, status code ${response.status}.`);
        }
        navigate("/products");
    };

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
                    <h1>Add New Product</h1>
                    <p>Enter the product details and inventory information below.</p>
                </div>

                <form className="customer-form product-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="productName">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            placeholder="e.g. Gold Standard Whey"
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
                                placeholder="0.00"
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
                                placeholder="0"
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
                            <option value="">Select a brand</option>
                            {brands.map((brand) => (
                                <option key={brand.brandID} value={brand.brandID}>
                                    {brand.brandName}
                                </option>
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
                            <option value="">Select a protein</option>
                            {proteins.map((protein) => (
                                <option key={protein.proteinTypeID} value={protein.proteinTypeID}>
                                    {protein.proteinType}
                                </option>
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
                            <option value="">Select a flavor</option>
                            {flavors.map((flavor) => (
                                <option key={flavor.flavorID} value={flavor.flavorID}>
                                    {flavor.flavorName}
                                </option>
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
                            Add Product
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default AddProduct;
