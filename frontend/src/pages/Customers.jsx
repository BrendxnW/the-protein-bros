import {useNavigate} from "react-router-dom";


function Customers({backendURL}) {
    const navigate = useNavigate();

    const customersList = [
        {id: 1, name: "John Forman", phone: "206-555-0148", address: "123 Maple St"},
        {id: 2, name: "Dean Smith", phone: "718-555-0192", address: "987 Cedar Ln"},
        {id: 3, name: "Bob Marley", phone: "347-555-0176", address: "426 Pine Rd"},
        {id: 4, name: "Sarah Chen", phone: "917-555-0133", address: "58 Birch Ave"}
        ];

    function deleteCustomer() {
        const confirm = window.confirm("Are you sure you want to delete this customer?");
        if (confirm) {}
    }
    
    return (
        <>
        <h1>Customers Page</h1>

        <button onClick={() => navigate("/add-customer")}>Add New Customer</button>

        <table>
            <thead>
                <tr>
                    <th>Customer ID</th>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {customersList.map((i) => (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                        <td>{i.phone}</td>
                        <td>{i.address}</td>
                        <td><button onClick={() => navigate(`/edit-customer/${i.id}`)}>Edit</button></td>
                        <td><button onClick={() => deleteCustomer()}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Customers;
