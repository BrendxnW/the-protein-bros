import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditCustomers({ backendURL }) {
    const navigate = useNavigate();
    const { customerID } = useParams();

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadCustomer = async () => {
            try {
                const response = await fetch(`${backendURL}/edit-customer/${customerID}`);

                if (!response.ok) {
                    throw new Error("Customer details could not be loaded.");
                }

                const data = await response.json();
                const customer = data.customer?.[0];

                if (!customer) {
                    throw new Error("Customer details could not be found.");
                }

                setCustomerName(customer.customerName ?? "");
                setPhoneNumber(customer.phoneNumber ?? "");
                setAddress(customer.address ?? "");
            } catch (loadError) {
                setError(loadError.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadCustomer();
    }, [backendURL, customerID]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSaving(true);

        try {
            const response = await fetch(`${backendURL}/edit-customer/${customerID}/update`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ customerName, phoneNumber, address })
            });

            if (!response.ok) {
                throw new Error(`Customer could not be updated (status ${response.status}).`);
            }

            navigate("/customers");
        } catch (saveError) {
            setError(saveError.message);
            setIsSaving(false);
        }
    };

    return (
        <main className="form-page">
            <button className="back-button" type="button" onClick={() => navigate("/customers")}>
                ← Back to Customers
            </button>

            <section className="form-card">
                <div className="form-card-header">
                    <span className="form-eyebrow">Customer #{customerID}</span>
                    <h1>Edit Customer</h1>
                    <p>Update the customer&apos;s contact information. Required fields are marked with an asterisk.</p>
                </div>

                {isLoading ? (
                    <p className="form-status" role="status">Loading customer details…</p>
                ) : (
                    <form className="customer-form" onSubmit={handleSubmit}>
                        {error && <p className="form-error" role="alert">{error}</p>}

                        <div className="form-field">
                            <label htmlFor="customerName">Full name <span aria-hidden="true"></span></label>
                            <input
                                id="customerName"
                                name="customerName"
                                type="text"
                                value={customerName}
                                placeholder="e.g. Jordan Smith"
                                autoComplete="name"
                                required
                                autoFocus
                                onChange={(e) => setCustomerName(e.target.value)}
                            />
                            <span className="field-hint">Enter the name used for orders and invoices.</span>
                        </div>

                        <div className="form-field">
                            <label htmlFor="phoneNumber">Phone number <span aria-hidden="true"></span></label>
                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={phoneNumber}
                                placeholder="e.g. 206-555-0123"
                                autoComplete="tel"
                                required
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <span className="field-hint">Include the area code.</span>
                        </div>

                        <div className="form-field">
                            <label htmlFor="address">Address <span className="optional-label">Optional</span></label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={address}
                                placeholder="e.g. 123 Main St, Seattle, WA 98101"
                                autoComplete="street-address"
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <span className="field-hint">Enter the customer&apos;s billing or delivery address.</span>
                        </div>

                        <div className="form-actions">
                            <button className="cancel-button" type="button" onClick={() => navigate("/customers")}>
                                Cancel
                            </button>
                            <button className="submit-button" type="submit" disabled={isSaving}>
                                {isSaving ? "Saving…" : "Save Changes"}
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </main>
    );
}

export default EditCustomers;
