import { useNavigate } from "react-router-dom";

function Invoices({ backendURL }) {
    const navigate = useNavigate();

    const invoicesList = [
        {
            id: 1,
            date: "2025-01-14",
            customer: "John Forman",
            total: 104.97
        },
        {
            id: 2,
            date: "2025-04-02",
            customer: "Dean Smith",
            total: 39.99
        },
        {
            id: 3,
            date: "2025-07-19",
            customer: "Bob Marley",
            total: 99.98
        },
        {
            id: 4,
            date: "2025-10-08",
            customer: "John Forman",
            total: 59.99
        }
    ];

    return (
        <>
            <h1>Invoices Page</h1>

            <button
                className="add-button"
                onClick={() => navigate("/add-invoice")}
            >
                Add New Invoice
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
                    {invoicesList.map((invoice) => (
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