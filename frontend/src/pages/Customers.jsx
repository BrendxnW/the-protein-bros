import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../index.css";

function Customers({backendURL}) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);

    const loadCustomers = useCallback(async() => {
        const response = await fetch(`${backendURL}/customers`);
        const data = await response.json();

        setCustomers(data.customers);
    }, [backendURL]);

    useEffect(() => {
        fetch(`${backendURL}/customers`)
            .then((response) => response.json())
            .then((data) => setCustomers(data.customers));
    }, [backendURL]);

    const deleteCustomer = async(customerID) => {
        const confirmed = window.confirm("Are you sure you want to delete this customer?");

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(`${backendURL}/customers/delete`, {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({customerID})
            });

            if (response.ok) {
                alert("Customer was deleted.");
                await loadCustomers();
                return;
            }

            const data = await response.json().catch(() => ({}));
            alert(data.error || `Failed to delete customer, status code ${response.status}.`);
        } catch {
            alert("Could not connect to the server to delete the customer.");
        }
    };
    
    return (
        <>

        <h1>Customers Page</h1>
        <button className="add-button" onClick={() => navigate("/add-customer")}>+ Add Customer</button>
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
                        <button className="delete-button" onClick={() => deleteCustomer(i.id)}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Customers;
