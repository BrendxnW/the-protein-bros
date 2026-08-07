import { useState, useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

function SupplierProducts({backendURL}) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const {supplierID} = useParams();

    const loadProducts = async() => {
        const response = await fetch(`${backendURL}/supplier-products/${supplierID}`);
        const data = await response.json();
        setProducts(data.products);
        setSupplier(data.supplier[0].supplierName);
    };

    useEffect(() => {
        loadProducts();
    }, [supplierID]);

    function deleteProduct(productID) {
        const check = window.confirm("Are you sure you want to delete this item?");
        if (check) {
            alert(`Product ${productID} would be deleted`);
        }
    }

    return (
        <>
        <h1>{supplier} Products</h1>

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
                            <button className="gen-button" onClick={() => navigate(`/edit-product/${i.id}`)}>Edit</button>
                            <button className="delete-button" onClick={() => deleteProduct(i.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
};
export default SupplierProducts;
