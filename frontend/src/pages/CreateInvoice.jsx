import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateInvoice({ backendURL }) {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [customerID, setCustomerID] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [totalCost, setTotalCost] = useState(0.00);
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch(`${backendURL}/add-invoice`)
            .then((response) => response.json())
            .then((data) => {
                setCustomers(data.customers);
                setProducts(data.products);
            });
    }, [backendURL]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        const newInvoice = { customerID, orderDate, totalCost, order };
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
    
    // Recording selected items, prices, and quantities
    function recordOrder(productID, price, quantity) {
        setOrder(order => {
            // Checking if product is already listed in the order
            const listed = order.find(x => x.productID === productID);
            
            // Product already listed in the invoice
            if (listed) {
                // Adjusting total cost of order
                const curItemTotal = listed.price * listed.quantity;
                const newItemTotal = price * quantity;
                setTotalCost(newTotal => totalCost + newItemTotal - curItemTotal);

                // Replacing listed values
                return order.map(x => {
                    if (x.productID === productID) {
                        return {
                            productID: x.productID,
                            price: x.price,
                            quantity: quantity
                        };
                    }
                    return x;
                });
            }

            // Product not listed in the Invoice
            // Adjust total cost of order
            setTotalCost(newTotal => totalCost + price * quantity);
            // Add new product to Invoice
            return [
                ...order,
                {
                    productID: productID,
                    price: price,
                    quantity: quantity
                }
            ];
        });
    };

    // Checks order to find the current saved quantity
    function getQuantity(productID) {
        const product = order.find(x => x.productID === productID);
        if (product) {
            return product.quantity;
        }
        return 0;
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
                            <div>${Math.abs(Number(totalCost)).toFixed(2)}</div>
                        </div>
                    </div>


                    <div>
                        <table className="form-table">
                            <thead>
                                <tr>
                                    <th>Item ID</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.product}</td>
                                        <td>${Number(product.price)}</td>
                                        <td>
                                            <input
                                                className="invoice-input"
                                                type="number"
                                                min="0"
                                                step="1"
                                                id="itemQuantity"
                                                value={getQuantity(product.id)}
                                                placeholder="0"
                                                onChange={(e) => recordOrder(product.id, Number(product.price), Number(e.target.value))}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
