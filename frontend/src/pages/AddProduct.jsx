import {useState} from "react";
import {useNavigate} from "react-router-dom";

function AddProduct({backendURL}) {
    const navigate = useNavigate();

    const [productName, setProductName] = useState("");
    const [cost, setCost] = useState("");
    const [brandID, setBrandID] = useState("");
    const [proteinTypeID, setProteinTypeID] = useState("");
    const [flavorID, setFlavorID] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");


    const brands = [
        {id: 1, name: "Legion"},
        {id: 2, name: "Optimum Nutrition"},
        {id: 3, name: "Transparent Labs"},
        {id: 4, name: "Dynamatize"},
        {id: 5, name: "Garden of Life"}
    ];

    const proteinTypes = [
        {id: 1, type: "Whey"},
        {id: 2, type: "Casein"}, 
        {id: 3, type: "Pea"},
        {id: 4, type: "Soy"},
        {id: 5, type: "Egg"}
    ];

    const flavors = [
        {id: 1, name: "Vanilla"},
        {id: 2, name: "Chocolate"},
        {id: 3, name: "Cookies & Cream"},
        {id: 4, name: "Salted Caramel"},
        {id: 5, name: "Unflavored"}
    ];

    function handleSubmit() {
        navigate("/products");
    }
    
    
    return (
        <>
        <h1>Add a new product</h1>
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
                    <option key={b.id} value={b.id}>{b.name}</option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="proteinTypeID">Protein Type: </label>
            <select id="proteinTypeID" value={proteinTypeID} onChange={(e) => setProteinTypeID(e.target.value)}>
                <option value="">Select a protein type</option>
                {proteinTypes.map((p) => (
                    <option key={p.id} value={p.id}>{p.type}</option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="flavorID">Flavor: </label>
            <select id="flavorID" value={flavorID} onChange={(e) => setFlavorID(e.target.value)}>
                <option value="">Select a flavor</option>
                {flavors.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
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
