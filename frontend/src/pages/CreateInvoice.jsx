import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateInvoice({ backendURL }) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [customerID, setCustomerID] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [totalCost, setTotalCost] = useState("");

    useEffect(() => {
        fetch(`${backendURL}/add-invoice`)
            .then((response) => response.json())
            .then((data) => setCustomers(data.customers));
    }, [backendURL]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newInvoice = { customerID, orderDate, totalCost };
        const response = await fetch(`${backendURL}/add-invoice`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newInvoice)
        });
        if (response.status === 200) {
            alert("Added new invoice");
        } else {
            alert(`Failed to create invoice, status code ${response.status}.`);
        }
        navigate("/invoices");
    };

    return (
        <main className="form-page">
            <button
                className="back-button"
                type="button"
                onClick={() => navigate("/invoices")}
            >
                ← Back to Invoices
            </button>

            <section className="form-card">
                <div className="form-card-header">
                    <h1>Create New Invoice</h1>
                    <p>Select a customer and enter the invoice details below.</p>
                </div>

                <form className="customer-form product-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="customerID">Customer</label>
                        <select
                            id="customerID"
                            value={customerID}
                            required
                            onChange={(e) => setCustomerID(e.target.value)}
                        >
                            <option value="">Select a customer</option>
                            {customers.map((customer) => (
                                <option key={customer.customerID} value={customer.customerID}>
                                    {customer.customerName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="product-form-row">
                        <div className="form-field">
                            <label htmlFor="orderDate">Order Date</label>
                            <input
                                type="date"
                                id="orderDate"
                                value={orderDate}
                                required
                                onChange={(e) => setOrderDate(e.target.value)}
                            />
                        </div>

                        <div className="form-field">
                            <label htmlFor="totalCost">Invoice Total</label>
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                id="totalCost"
                                value={totalCost}
                                placeholder="0.00"
                                required
                                onChange={(e) => setTotalCost(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            className="cancel-button"
                            type="button"
                            onClick={() => navigate("/invoices")}
                        >
                            Cancel
                        </button>
                        <button className="submit-button" type="submit">
                            Create Invoice
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default CreateInvoice;
