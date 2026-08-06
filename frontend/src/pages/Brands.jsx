import { useState, useEffect } from 'react';
import "../index.css";

function Brands({backendURL}) {
    const [brands, setBrands] = useState([]);

    const loadBrands = async() => {
        const response = await fetch(`${backendURL}/brands`);
        const data = await response.json();
        setBrands(data.brands);
    };

    useEffect(() => {
        loadBrands();
    }, []);

    return (
        <>
        <h1>Brands Page</h1>

        <table>
            <thead>
                <tr>
                    <th>Brand ID</th>
                    <th>Brand</th>
                </tr>
            </thead>
            <tbody>
                {brands.map((brand) => (
                    <tr key={brand.id}>
                        <td>{brand.id}</td>
                        <td>{brand.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}
export default Brands;