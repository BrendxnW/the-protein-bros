import { useState, useEffect } from 'react';
import "../index.css";

function Flavors({backendURL}) {
    const [flavors, setFlavors] = useState([]);

    const loadFlavors = async() => {
        const response = await fetch(`${backendURL}/flavors`);
        const data = await response.json();
        setFlavors(data.flavors);
    };

    useEffect(() => {
        loadFlavors();
    }, []);

    return (
        <>
        <h1>Flavors Page</h1>

        <table>
            <thead>
                <tr>
                    <th>Flavor ID</th>
                    <th>Flavor Name</th>
                </tr>
            </thead>
            <tbody>
                {flavors.map((i) => (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Flavors;
