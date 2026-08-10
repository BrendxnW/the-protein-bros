import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";


function InvoiceDetails({ backendURL }) {
    const navigate = useNavigate();
    const [details, setDetails] = useState([]);
    const { invoiceID } = useParams();

    useEffect(() => {
        fetch(`${backendURL}/invoice-details/${invoiceID}`)
            .then((response) => response.json())
            .then((data) => setDetails(data.invoiceDetails));
    }, [backendURL, invoiceID]);

    return (
        <>
        <h1>Invoice {invoiceID} Details</h1>
        <div className="details-back">
            <button
                className="back-button"
                type="button"
                onClick={() => navigate("/invoices")}
            >
                ← Back to Invoices
            </button>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {details.map((i) => (
                    <tr key={i.id}>
                        <td>{i.product}</td>
                        <td>{i.quantity}</td>
                        <td>{i.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    );
}

export default InvoiceDetails;
