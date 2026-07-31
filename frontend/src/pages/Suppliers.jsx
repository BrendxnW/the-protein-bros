import {Link} from 'react-router-dom';

function Suppliers({backendURL}) {
    const suppliersList = [
        {id: 1, supplier: "UNFI", contact: "John Doe", number: "206-444-1111", address: "123 Maple St"},
        {id: 2, supplier: "Europa Sports Products", contact: "Alex Smith", number: "718-333-2222", address: "987 Cedar Ln"},
        {id: 3, supplier: "Muscle Foods USA", contact: "Jamie Lee", number: "718-999-5555", address: "426 Pine Rd"}
    ]
    return (
        <>
        <h1>Suppliers Page</h1>

        <table>
            <thead>
                <tr>
                    <th>Supplier</th>
                    <th>Contact</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Products</th>
                </tr>
            </thead>
            <tbody>
                {suppliersList.map((i) => (
                    <tr key={i.id}>
                        <td>{i.supplier}</td>
                        <td>{i.contact}</td>
                        <td>{i.number}</td>
                        <td>{i.address}</td>
                        <td><Link to={`/supplier-products/${i.supplier}`}>Products</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Suppliers;