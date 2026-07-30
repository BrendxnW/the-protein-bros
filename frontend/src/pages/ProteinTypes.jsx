
function ProteinTypes({backendURL}) {
    const proteinTypesList = [
        {id: 1, type: "Whey"},
        {id: 2, type: "Casein"},
        {id: 3, type: "Pea"},
        {id: 4, type: "Soy"},
        {id: 5, type: "Egg"}
    ];
    
    return (
        <>
        <h1>Protein Types Page</h1>
        <table>
            <thead>
                <tr>
                    <th>Protein Type ID</th>
                    <th>Protein Type</th>
                </tr>
            </thead>
            <tbody>
                {proteinTypesList.map((i) => (
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
