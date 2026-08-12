import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../index.css";

function Products({ backendURL }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const loadProducts = async() => {
        const response = await fetch(`${backendURL}/products`);
        const data = await response.json();
        setProducts(data.products);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const deleteProduct = async(productID) => {
        const check = window.confirm("Are you sure you want to delete this item?");
        if (check) {
            const response = await fetch(`${backendURL}/products/delete`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({productID})
            });
            if (response.status === 200) {
                alert(`Product was deleted.`);
                await loadProducts();
            } else {
                alert(`Failed to delete products, status code ${response.status}.`);
            };
        }
    };

    return (
        <>

            <h1>Products</h1>
            <button className="add-button" onClick={() => navigate("/add-product")}> + Add Product</button>

            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Flavor</th>
                        <th>Protein</th>
                        <th>Price</th>
                        <th>Inventory</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product}</td>
                            <td>{product.brand}</td>
                            <td>{product.flavor}</td>
                            <td>{product.protein}</td>
                            <td>${product.price}</td>
                            <td>{product.inventory}</td>
                            <td>
                                <button className="gen-button" onClick={() => {
                                    navigate(`/edit-product/${product.id}`, {
                                        state: product
                                    });
                                }}>
                                    Edit
                                </button>
                                <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </>
    );
}

export default Products;
