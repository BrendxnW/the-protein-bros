import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function AddProduct({backendURL}) {
    const navigate = useNavigate();
    
    // Receive from backend to populate drop-down
    const [brands, setBrands] = useState([]);
    const [proteins, setProteins] = useState([]);
    const [flavors, setFlavors] = useState([]);

    // Send to backend to create new product
    const [productName, setProductName] = useState("");
    const [cost, setCost] = useState("");
    const [brandID, setBrandID] = useState("");
    const [proteinTypeID, setProteinTypeID] = useState("");
    const [flavorID, setFlavorID] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");

    const loadData = async() => {
        const response = await fetch(`${backendURL}/add-product`);
        const data = await response.json();
        setBrands(data.brands);
        setProteins(data.proteins);
        setFlavors(data.flavors);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async() => {
        const newProduct = {
            productName,
            cost,
            brandID,
            proteinTypeID,
            flavorID,
            stockQuantity
        };
        const response = await fetch(`${backendURL}/add-product`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
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
        <>
        <h1>Add New Product</h1>
        <div>
            <label htmlFor="productName">Product Name: </label>
            <input type="text" id="productName" value={productName}
                onChange={(e) => setProductName(e.target.value)} />
        </div>

        <div>
            <label htmlFor="cost">Cost: </label>
            <input type="number" step="0.01" id="cost" value={cost}
                onChange={(e) => setCost(e.target.value)} />
        </div>

        <div>
            <label htmlFor="brandID">Brand: </label>
            <select id="brandID" value={brandID} onChange={(e) => setBrandID(e.target.value)}>
                <option value="">Select a brand</option>
                {brands.map((b) => (
                    <option key={b.brandID} value={b.brandID}>
                        {b.brandName}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="proteinTypeID">Protein Type: </label>
            <select id="proteinTypeID" value={proteinTypeID} onChange={(e) => setProteinTypeID(e.target.value)}>
                <option value="">Select a protein</option>
                {proteins.map((p) => (
                    <option key={p.proteinTypeID} value={p.proteinTypeID}>
                        {p.proteinType}
                        </option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="flavorID">Flavor: </label>
            <select id="flavorID" value={flavorID} onChange={(e) => setFlavorID(e.target.value)}>
                <option value="">Select a flavor</option>
                {flavors.map((f) => (
                    <option key={f.flavorID} value={f.flavorID}>{f.flavorName}</option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="stockQuantity">Inventory: </label>
            <input type="number" id="stockQuantity" value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)} />
        </div>

        <div>
            <button onClick={() => handleSubmit()}>Add Product</button>
        </div>
        </>
    )
};
export default AddProduct;
