import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../index.css";

function Suppliers({backendURL}) {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);

    const loadSuppliers = async() => {
        const response = await fetch(`${backendURL}/suppliers`);
        const data = await response.json();
        setSuppliers(data.suppliers);
    };

    useEffect(() => {
        loadSuppliers();
    }, []);

    return (
        <>
        <h1>Suppliers Page</h1>

        <table>
            <thead>
                <tr>
                    <th>Supplier</th>
                    <th>Contact</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Products</th>
                </tr>
            </thead>
            <tbody>
                {suppliers.map((i) => (
                    <tr key={i.id}>
                        <td>{i.supplier}</td>
                        <td>{i.contact}</td>
                        <td>{i.number}</td>
                        <td>{i.address}</td>
                        <td>
                            <button className="gen-button" onClick={() => navigate(`/supplier-products/${i.id}`)}>View Products</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Suppliers;