import {useParams} from 'react-router-dom';

function SupplierProducts({backendURL}) {
    const productsList = {
        "UNFI": [
            {id: 1, product: "Gold Standard 100% Whey", price: 28.49},
            {id: 2, product: "ISO100", price: 27.99}
        ],
        "Europa Sports Products": [
            {id: 5, product: "Grass-Fed Whey Protein Isolate", price: 41.99},
            {id: 4, product: "Casein+", price: 45.49}
        ],
        "Muscle Foods USA": [
            {id: 3, product: "Sport Plant-Based Protein", price: 24.49},
            {id: 1, product: "Gold Standard 100% Whey", price: 27.99}
        ]
    };

    const {supplierID} = useParams();
    const products = productsList[supplierID];

    return (
        <>
        <h1>{supplierID}</h1>

        <table>
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Product</th>
                    <th>WholeSale Cost</th>
                </tr>
            </thead>
            <tbody>
                {products.map((i) => (
                    <tr key={i}>
                        <td>{i.id}</td>
                        <td>{i.product}</td>
                        <td>{i.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
};
export default SupplierProducts;