import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../index.css";

function Customers({backendURL}) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);

    const loadCustomers = async() => {
        const response = await fetch(`${backendURL}/customers`);
        const data = await response.json();

        setCustomers(data.customers);
    };

    useEffect(() => {
        loadCustomers();
    }, []);


    function deleteCustomer(customerID) {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");
        if (confirmed) {
            alert(`Customer ${customerID} would be deleted`);
        }
    }
    
    return (
        <>

        <h1>Customers Page</h1>
        <button className="add-button" onClick={() => navigate("/add-customer")}>Add New Customer</button>
        <table>
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((i) => (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.phone}</td>
                        <td>{i.address}</td>
                        <td><button className="gen-button" onClick={() => navigate(`/edit-customer/${i.id}`)}>Edit</button>
                        <button className="delete-button" onClick={() => deleteCustomer()}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Customers;
