
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

export default Products;