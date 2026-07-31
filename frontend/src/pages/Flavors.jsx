function Flavors({backendURL}) {
    const flavorsList = [
        {id: 1, name: "Vanilla"},
        {id: 2, name: "Chocolate"},
        {id: 3, name: "Cookies & Cream"},
        {id: 4, name: "Salted Caramel"},
        {id: 5, name: "Unflavored"}
    ];

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
                {flavorsList.map((i) => (
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
