import {useNavigate} from "react-router-dom";

<<<<<<< HEAD
import { useEffect, useState } from "react";

function Products() {
    const [products] = useState([
        {
            productID: 1,
            productName: "Gold Standard 100% Whey",
            cost: 34.99,
            stockQuantity: 240,
            brandID: 2,
            proteinTypeID: 1,
            flavorID: 2,
        },
        {
            productID: 2,
            productName: "ISO100",
            cost: 39.99,
            stockQuantity: 180,
            brandID: 4,
            proteinTypeID: 1,
            flavorID: 3,
        },
        {
            productID: 3,
            productName: "Sports Plant Based Protein",
            cost: 34.99,
            stockQuantity: 95,
            brandID: 5,
            proteinTypeID: 4,
            flavorID: 1,
        },
        {
            productID: 4,
            productName: "Casein+",
            cost: 64.99,
            stockQuantity: 60,
            brandID: 1,
            proteinTypeID: 2,
            flavorID: 2,
        },
        {
            productID: 5,
            productName: "Grass Fed Whey Protein Isolate",
            cost: 59.99,
            stockQuantity: 120,
            brandID: 3,
            proteinTypeID: 1,
            flavorID: 4,
        }
    ]);

    return (
        <main className="products-page">
            <h1>PRODUCTS</h1>

            <a className="add-product" href="/products/add">
                + Add Product
            </a>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Cost</th>
                        <th>Stock Quantity</th>
                        <th>Brand ID</th>
                        <th>Protein Type ID</th>
                        <th>Flavor ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.productID}>
                            <td>{product.productID}</td>
                            <td>{product.productName}</td>
                            <td>${product.cost.toFixed(2)}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.brandID}</td>
                            <td>{product.proteinTypeID}</td>
                            <td>{product.flavorID}</td>

                            <td>
                                <a href={`/products/edit/${product.productID}`}>
                                    Edit
                                </a>

                                {" "}

                                <button type="button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

=======
function Products({backendURL}) {
    const navigate = useNavigate();

    return (
        <>
        <h1>Products Page</h1>
        <button onClick={() => navigate("/add-product")}>Add New Product</button>
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
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Gold Standard 100% Whey</td>
                    <td>Optimum Nutrition</td>
                    <td>Chocolate</td>
                    <td>Whey</td>
                    <td>34.99</td>
                    <td>50</td>
                    <td>button</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>ISO100</td>
                    <td>Dynamatize</td>
                    <td>Cookies & Cream</td>
                    <td>Whey</td>
                    <td>39.99</td>
                    <td>40</td>
                    <td>button</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Sport Plant-Based Protein</td>
                    <td>Garden of Life</td>
                    <td>Vanilla</td>
                    <td>Pea</td>
                    <td>34.99</td>
                    <td>30</td>
                    <td>button</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Casein+</td>
                    <td>Legion</td>
                    <td>Chocolate</td>
                    <td>Casein</td>
                    <td>64.99</td>
                    <td>25</td>
                    <td>button</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Grass-Fed Whey Protein Isolate</td>
                    <td>Transparent Labs</td>
                    <td>Salted Caramel</td>
                    <td>Whey</td>
                    <td>59.99</td>
                    <td>20</td>
                    <td>button</td>
                </tr>
            </tbody>
        </table>
        </>
    )
};
>>>>>>> a01524f6cad6642f93a926843032b70d9dce163a
export default Products;