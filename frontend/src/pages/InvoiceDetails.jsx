import { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";


function InvoiceDetails({backendURL}) {
    const [details, setDetails] = useState([]);
    const {invoiceID} = useParams();

    const loadDetails = async() => {
        const response = await fetch(`${backendURL}/invoice-details/${invoiceID}`);
        const data = await response.json();
        setDetails(data.invoiceDetails);
    };

    useEffect(() => {
        loadDetails();
    }, [invoiceID]);

    return (
        <>
        <h1>Invoice {invoiceID} Details</h1>
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
    )
};
export default InvoiceDetails;