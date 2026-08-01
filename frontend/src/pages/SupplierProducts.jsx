import {useParams, useNavigate} from 'react-router-dom';

function SupplierProducts({backendURL}) {
    const productsList = {
        1: [
            {id: 1, product: "Gold Standard 100% Whey", price: 28.49},
            {id: 2, product: "ISO100", price: 27.99}
        ],
        2: [
            {id: 5, product: "Grass-Fed Whey Protein Isolate", price: 41.99},
            {id: 4, product: "Casein+", price: 45.49}
        ],
        3: [
            {id: 3, product: "Sport Plant-Based Protein", price: 24.49},
            {id: 1, product: "Gold Standard 100% Whey", price: 27.99}
        ]
    };

    const key = {
        1: "UNFI",
        2: "Europa Sports Products",
        3: "Muscle Foods USA"
    };
    const navigate = useNavigate();
    const {supplierID} = useParams();
    const title = key[supplierID];
    const products = productsList[supplierID];

    function deleteProduct() {
        const check = window.confirm("Are you sure you want to delete this item?");
        if (check) {}
    };

    return (
        <>
        <h1>{title}</h1>

        <table>
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Product</th>
                    <th>WholeSale Cost</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((i) => (
                    <tr key={i.id}>
                        <td>{i.id}</td>
                        <td>{i.product}</td>
                        <td>{i.price}</td>
                        <td><button onClick={() => navigate(`/edit-product/${i.id}`)}>Edit</button></td>
                        <td><button onClick={() => deleteProduct()}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
};
export default SupplierProducts;