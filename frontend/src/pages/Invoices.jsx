import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Invoices({ backendURL }) {
    const navigate = useNavigate();
    const [invoices, setInvoices] = useState([]);

    const loadInvoices = async() => {
        const response = await fetch(`${backendURL}/invoices`);
        const data = await response.json();
        setInvoices(data.invoices);
    };

    useEffect(() => {
        loadInvoices();
    }, []);

    return (
        <>
            <h1>Invoices Page</h1>

            <button
                className="add-button"
                onClick={() => navigate("/add-invoice")}
            >
                + Add Invoice
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Invoice Number</th>
                        <th>Date</th>
                        <th>Customer</th>
                        <th>Invoice Total</th>
                        <th>Invoice Details</th>
                    </tr>
                </thead>

                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                            <td>{invoice.id}</td>
                            <td>{invoice.date}</td>
                            <td>{invoice.customer}</td>
                            <td>{invoice.total}</td>
                            <td>
                                <button className="gen-button" onClick={() => navigate(`/invoice-details/${invoice.id}`)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Invoices;