import { useState, useEffect } from 'react';
import "../index.css";

function ProteinTypes({backendURL}) {
    const [proteins, setProteins] = useState([]);

    const loadProteins = async() => {
        const response = await fetch(`${backendURL}/proteintypes`);
        const data = await response.json();
        setProteins(data.proteins);
    };

    useEffect(() => {
        loadProteins();
    }, []);
    
    return (
        <>
        <h1>Protein Types Page</h1>
        <table>
            <thead>
                <tr>
                    <th>Protein ID</th>
                    <th>Protein</th>
                </tr>
            </thead>
            <tbody>
                {proteins.map((i) => (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.type}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default ProteinTypes;
