import { Link } from "react-router-dom";

function Navigation() {
    return (
        <nav>

            <Link to="/">Home</Link>{" "}
            <Link to="/products">Products</Link>{" "}
            <Link to="/customers">Customers</Link>{" "}
            <Link to="/suppliers">Suppliers</Link>{" "}
            <Link to="/brands">Brands</Link>{" "}
            <Link to="/proteintypes">Protein Types</Link>{" "}
            <Link to="/flavors">Flavors</Link>{" "}
            <Link to="/invoices">Invoices</Link>
        </nav>
    );
}

export default Navigation;