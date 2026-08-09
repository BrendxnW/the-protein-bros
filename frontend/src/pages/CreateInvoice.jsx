import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function CreateInvoice({backendURL}) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [customerID, setCustomerID] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [totalCost, setTotalCost] = useState("");
    // populate from customers table later

    const loadCustomers = async() => {
        const response = await fetch(`${backendURL}/add-invoice`);
        const data = await response.json();
        setCustomers(data.customers);
    };

    useEffect(() => {loadCustomers();}, []);

    const handleSubmit = async() => {
        const newInvoice = {customerID, orderDate, totalCost};
        const response = await fetch(`${backendURL}/add-invoice`, {
            method: `POST`,
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newInvoice)
        });
        if (response.status === 200) {
            alert("Added new Invoice");
        } else {
            alert(`Failed to create invoice, status code ${response.status}.`);
        }
        navigate("/invoices");
    };

    return (
        <>
        <h1>Create New Invoice</h1>
        <div>
        <label htmlFor="customerID">Customer: </label>
            <select value={customerID} onChange={(e) => setCustomerID(e.target.value)}>
                <option value=''>Select a customer</option>
                {customers.map((customer) => (
                    <option key={customer.customerID} value={customer.customerID}>
                        {customer.customerName}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <label htmlFor="orderDate">Order Date: </label>
            <input type="date" id="orderDate" value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)} />
        </div>

        <div>
            <label htmlFor="totalCost">Invoice Total: </label>
            <input type="number" step="0.01" id="totalCost" value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)} />
        </div>

        <div>
            <button onClick={() => handleSubmit()}>Create Invoice</button>
        </div>
        </>
    )
};
export default CreateInvoice;
