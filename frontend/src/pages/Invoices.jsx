import {useNavigate} from "react-router-dom";


function Invoices({backendURL}) {
    const navigate = useNavigate();

    return (
        <>
        <h1>Invoices Page</h1>

        <button onClick={() => navigate("/new-invoice")}>Add New Invoice</button>

        <table>
            <tr>
                <th>Invoice Number</th>
                <th>Date</th>
                <th>Customer</th> {/* Name not ID here */}
                <th>Invoice Total</th>
                <th>Invoice Details</th> {/* Add link!! */}
            </tr>
            <tr>
                <td>1</td>
                <td>2025-01-14</td>
                <td>John Forman</td>
                <td>104.97</td>
                <td>Details</td>
            </tr>
            <tr>
                <td>2</td>
                <td>2025-04-02</td>
                <td>Dean Smith</td>
                <td>39.99</td>
                <td>Details</td>
            </tr>
            <tr>
                <td>3</td>
                <td>2025-07-19</td>
                <td>Bob Marley</td>
                <td>99.98</td>
                <td>Details</td>
            </tr>
            <tr>
                <td>4</td>
                <td>2025-10-08</td>
                <td>John Forman</td>
                <td>59.99</td>
                <td>Details</td>
            </tr>
        </table>
        </>
    )
}
export default Invoices;