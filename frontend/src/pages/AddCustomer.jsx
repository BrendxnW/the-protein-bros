import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCustomer({ backendURL }) {
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCustomer = { customerName, phoneNumber, address };
        const response = await fetch(`${backendURL}/add-customer`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        });
        if (response.status === 200) {
            alert("Added new customer");
        } else {
            alert(`Failed to add new customer, status code ${response.status}.`);
        }
        navigate("/customers");
    };

    return (
        <main className="form-page">
            <button
                className="back-button"
                type="button"
                onClick={() => navigate("/customers")}
            >
                ← Back to Customers
            </button>

            <section className="form-card">
                <div className="form-card-header">
                    <h1>Add New Customer</h1>
                    <p>Enter the customer&apos;s contact information below.</p>
                </div>

                <form id="new-customer-form" className="customer-form" onSubmit={handleSubmit}>
                    <div className="form-field">
                        <label htmlFor="customerName">Customer Name</label>
                        <input
                            id="customerName"
                            value={customerName}
                            type="text"
                            name="customerName"
                            placeholder="e.g. Jordan Smith"
                            autoComplete="name"
                            required
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            id="phoneNumber"
                            value={phoneNumber}
                            type="tel"
                            name="phoneNumber"
                            placeholder="e.g. 206-555-0123"
                            autoComplete="tel"
                            required
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="address">Address</label>
                        <input
                            id="address"
                            value={address}
                            type="text"
                            name="address"
                            placeholder="e.g. 123 Main St"
                            autoComplete="street-address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className="form-actions">
                        <button
                            className="cancel-button"
                            type="button"
                            onClick={() => navigate("/customers")}
                        >
                            Cancel
                        </button>
                        <button className="submit-button" type="submit">
                            Add Customer
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default AddCustomer;
