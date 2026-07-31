import {useState} from "react";
import {useNavigate} from "react-router-dom";

function CreateInvoice({backendURL}) {
    const navigate = useNavigate();
    const [customerID, setCustomerID] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [totalCost, setTotalCost] = useState("");
    // populate from customers table later
    const customers = [
        {id: 1, name: "John Forman"},
        {id: 2, name: "Dean Smith"},
        {id: 3, name: "Bob Marley"},
        {id: 4, name: "Sarah Chen"}
    ];
    function handleSubmit() {
        navigate("/invoices");
    }
    return (
        <>
        <h1>create new invoice</h1>
        <div>
        <label htmlFor="customerID">Customer: </label>
            <select id="customerID" value={customerID} onChange={(e) => setCustomerID(e.target.value)}>
                <option value="">Select a customer</option>
                {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
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
