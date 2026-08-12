import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct({backendURL}) {
    const navigate = useNavigate();
    const { productID } = useParams();

    // To be sent to backend to edit an existing product
    const [productName, setProductName] = useState("");
    const [cost, setCost] = useState("");
    const [brandID, setBrandID] = useState("");
    const [proteinTypeID, setProteinTypeID] = useState("");
    const [flavorID, setFlavorID] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");

    // Receive from backend to populate drop-downs
    const [brands, setBrands] = useState([]);
    const [proteins, setProteins] = useState([]);
    const [flavors, setFlavors] = useState([]);

    // Load chosen product information on page
    const loadProduct = async() => {
        const response = await fetch(`${backendURL}/edit-product/${productID}`);
        const data = await response.json();

        const product = data.product[0];

        setProductName(product.productName);
        setCost(product.cost);
        setBrandID(product.brandID);
        setProteinTypeID(product.proteinTypeID);
        setFlavorID(product.flavorID);
        setStockQuantity(product.stockQuantity);
    };

    useEffect(() => {
        fetch(`${backendURL}/add-product`)
            .then((response) => response.json())
            .then((data) => {
                setBrands(data.brands);
                setProteins(data.proteins);
                setFlavors(data.flavors);
            });
        loadProduct();
    }, [backendURL]);

    const handleSubmit = async(e) => {
        e.preventDefault();

        const editProduct = {
            productID,
            productName,
            cost,
            stockQuantity,
            brandID,
            proteinTypeID,
            flavorID
        };
        const response = await fetch(`${backendURL}/edit-product/${productID}/update`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(editProduct)
        });

        if (response.status === 200) {
            alert(`Updated product #${productID} : ${productName}`);
        } else {
            alert(`Failed to edit product, status code ${response.satus}.`);
        }
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
                                <option key={brand.brandID} value={brand.brandID}>{brand.brandName}</option>
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
                            {proteins.map((protein) => (
                                <option key={protein.proteinTypeID} value={protein.proteinTypeID}>{protein.proteinType}</option>
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
                                <option key={flavor.flavorID} value={flavor.flavorID}>{flavor.flavorName}</option>
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
