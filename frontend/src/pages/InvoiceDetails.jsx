import {useParams} from "react-router-dom";


function InvoiceDetails({backendURL}) {
    const invoices = {
        1: [
            {product: "Gold Standard 100% Whey", quantity: 2, price: 34.99},
            {product: "Sport Plant-Based Protein", quantity: 1, price: 34.99}
        ],
        2: [
            {product: "ISO 100", quantity: 1, price: 39.99}
        ],
        3: [
            {product: "Casein+", quantity: 1, price: 64.99},
            {product: "Sport Plant-Based Protein", quantity: 1, price: 34.99}
        ],
        4: [
            {product: "Grass-Fed Whey Protein Isolate", quantity: 1, price: 59.99}
        ]
    };

    const {invoiceID} = useParams();
    const details = invoices[invoiceID];

    return (
        <>
        <h1>Invoice Details</h1>
        <table>
            <thead>
                <tr>
                    <th>Invoice ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {details.map((i) => (
                    <tr>
                        <td>{invoiceID}</td>
                        <td>{i.product}</td>
                        <td>{i.quantity}</td>
                        <td>{i.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
};
export default InvoiceDetails;