import { useNavigate } from "react-router-dom";
import "../index.css";

function Products({ backendURL }) {
    const navigate = useNavigate();

    const productsList = [
        {
            id: 1,
            product: "Gold Standard 100% Whey",
            brand: "Optimum Nutrition",
            flavor: "Chocolate",
            protein: "Whey",
            price: 34.99,
            inventory: 50
        },
        {
            id: 2,
            product: "ISO100",
            brand: "Dynamatize",
            flavor: "Cookies & Cream",
            protein: "Whey",
            price: 39.99,
            inventory: 40
        },
        {
            id: 3,
            product: "Sport Plant-Based Protein",
            brand: "Garden of Life",
            flavor: "Vanilla",
            protein: "Pea",
            price: 34.99,
            inventory: 30
        },
        {
            id: 4,
            product: "Casein+",
            brand: "Legion",
            flavor: "Chocolate",
            protein: "Casein",
            price: 64.99,
            inventory: 25
        },
        {
            id: 5,
            product: "Grass-Fed Whey Protein Isolate",
            brand: "Transparent Labs",
            flavor: "Salted Caramel",
            protein: "Whey",
            price: 59.99,
            inventory: 20
        }
    ];

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
                    {productsList.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product}</td>
                            <td>{product.brand}</td>
                            <td>{product.flavor}</td>
                            <td>{product.protein}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.inventory}</td>
                            <td>
                                <button className="edit-button" onClick={() => deleteProduct(product.id)}>
Edit</button>
<button className="delete-button" onClick={() => deleteProduct(product.id)}>
Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            
        </>
    );
}

export default Products;