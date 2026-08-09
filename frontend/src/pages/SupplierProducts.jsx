import { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

function SupplierProducts({backendURL}) {
    const navigate = useNavigate();
    // For select/display of current products offerred by Supplier
    const [products, setProducts] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const {supplierID} = useParams();

    // To add products
    const [isOpen, setIsOpen] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [addProductID, setAddProductID] = useState("");
    const [addWholesale, setAddWholesale] = useState("");

    const loadProducts = async() => {
        const response = await fetch(`${backendURL}/supplier-products/${supplierID}`);
        const data = await response.json();
        setProducts(data.products);
        setSupplier(data.supplier[0].supplierName);
        setAllProducts(data.allProducts);
    };

    useEffect(() => {
        loadProducts();
    }, [supplierID]);

    const deleteProduct = async(productID) => {
        const check = window.confirm("Are you sure you want to delete this item?");
        if (check) {
            const deleteRelation = {supplierID, productID};
            const response = await fetch(`${backendURL}/supplier-products/:id/delete`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(deleteRelation)
            });
            if (response.status === 200) {
                alert(`Product ${productID} was removed from ${supplier}.`);
                await loadProducts();
            } else {
                alert(`Failed to delete product, status code ${response.status}.`);
            };
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newSupplierProduct = {addProductID, supplierID, addWholesale};
        const response = await fetch(`${backendURL}/supplier-products/${supplierID}`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newSupplierProduct)
        });

        if (response.status === 200) {
            alert("Added product");
            await loadProducts();
            setIsOpen(false);
        } else {
            alert(`Failed to add product, status code ${response.status}.`);
        }
    }

    return (
        <>
        <h1>{supplier}</h1>
        <button className="add-button" onClick={() => setIsOpen(!isOpen)}>
             + Add Product
        </button>

        {isOpen && (
            <div className="new-supplier-product">
                <form id='new-supplier-product' onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="addProduct">Product: </label>
                    <select id="addProductID" value={addProductID} onChange={(e) => 
                        setAddProductID(e.target.value)}>
                        <option value="">Select a Product</option>
                        {allProducts.map((e) => (
                            <option key={e.productID} value={e.productID}>
                                {e.Product}
                            </option>
                        ))}
                    </select>
                    </div>

                    <div>
                    <label>WholeSale: </label>
                    <input id="wholesale" value={addWholesale} type="number" step="0.01" name="AddWholesale"
                        onChange={(e) => setAddWholesale(e.target.value)} />
                    </div>

                    <button className="submit-button" type="submit">Add</button>
                </form>


            </div>
        )}


        <table>
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Product</th>
                    <th>WholeSale</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map((i) => (
                    <tr key={i.id}>
                        <td>{i.productid}</td>
                        <td>{i.product}</td>
                        <td>{i.price}</td>
                        <td>
                            <button className="gen-button" onClick={() => navigate(`/edit-product/${i.productid}`)}>Edit</button>
                            <button className="delete-button" onClick={() => deleteProduct(i.productid)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
};
export default SupplierProducts;
