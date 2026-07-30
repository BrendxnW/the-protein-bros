import {useNavigate, Link} from "react-router-dom";


function Invoices({backendURL}) {
    const navigate = useNavigate();

    return (
        <>
        <h1>Invoices Page</h1>

        <button onClick={() => navigate("/add-invoice")}>Add New Invoice</button>

        <table>
            <thead>
                <tr>
                    <th>Invoice Number</th>
                    <th>Date</th>
                    <th>Customer</th> {/* Name not ID here */}
                    <th>Invoice Total</th>
                    <th>Invoice Details</th> {/* Add link!! */}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2025-01-14</td>
                    <td>John Forman</td>
                    <td>104.97</td>
                    <td><Link to={'/invoice-details/1'}>View Details</Link></td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>2025-04-02</td>
                    <td>Dean Smith</td>
                    <td>39.99</td>
                    <td><Link to={'/invoice-details/2'}>View Details</Link></td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>2025-07-19</td>
                    <td>Bob Marley</td>
                    <td>99.98</td>
                    <td><Link to={'/invoice-details/3'}>View Details</Link></td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>2025-10-08</td>
                    <td>John Forman</td>
                    <td>59.99</td>
                    <td><Link to={'/invoice-details/4'}>View Details</Link></td>
                </tr>
            </tbody>
        </table>
        </>
    )
}
export default Invoices;