import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCustomer({backendURL}) {
    const navigate = useNavigate();

    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newCustomer = {customerName, phoneNumber, address};
        const response = await fetch(`${backendURL}/add-customer`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newCustomer)
        });
        if (response.status === 200) {
            alert("Added new customer");
        } else {
            alert(`Failed to add new customer, status code ${response.status}.`);
        }
        navigate("/customers");
    };

    return (
        <>
        <h1>Add New Customer</h1>

        <form id='new-customer-form' onSubmit={handleSubmit}>

            <div>
                <label htmlFor="customerName">Customer Name: </label>
                <input id="customerName" value={customerName} type="text" name="customerName"
                    onChange={(e) => setCustomerName(e.target.value)} />
            </div>    

            <div>
                <label htmlFor="phoneNumber">Phone Number: </label>
                <input id="phoneNumber" value={phoneNumber} type="tel" name="phoneNumber"
                    onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>    

            <div>
                <label htmlFor="address">Address: </label>
                <input id="address" value={address} type="text" name="address"
                    onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
            <button className="submit-button" type="submit">Submit</button>
            </div>
        </form>
        </>
    )
};
export default AddCustomer;