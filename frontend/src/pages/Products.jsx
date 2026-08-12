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

    function deleteProduct(productID) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (confirmed) {
            alert(`Product ${productID} would be deleted`);

        }
    }

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
