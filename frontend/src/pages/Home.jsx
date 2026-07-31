import {Link} from "react-router-dom";
function Home() {
    return (
        <>
            <h1>Home page</h1>
            <div className="homepageDescription">
                <p>Database-driven storefront for The Protein Bros, an e-commerce
                business selling protein powder.</p>
                <p>By Brendon Wong, Tesneem El-kheir, and Alec Ilstrup.</p>

                <h2>Browse Pages</h2>
                <ul>
                    <li><Link to="/products">Products</Link> — Browse products</li>
                    <li><Link to="/customers">Customers</Link> — Browse customers</li>
                    <li><Link to="/suppliers">Suppliers</Link> — Browse suppliers</li>
                    <li><Link to="/brands">Brands</Link> — Browse brands</li>
                    <li><Link to="/proteintypes">Protein Types</Link> — Browse protein types</li>
                    <li><Link to="/flavors">Flavors</Link> — Browse flavors</li>
                    <li><Link to="/invoices">Invoices</Link> — Browse invoices</li>
                </ul>

                <h2>Add / Edit Pages</h2>
                <ul>
                    <li><Link to="/add-product">Add Product</Link> — Add a new product</li>
                    <li><Link to="/edit-product/1">Edit Product</Link> — Edit a product</li>
                    <li><Link to="/add-invoice">Create Invoice</Link> — Add a new invoice</li>
                </ul>

                <h2>Detail Pages</h2>
                <ul>
                    <li><Link to="/invoice-details/1">Invoice Details</Link> — View invoice line items</li>
                    <li><Link to="/supplier-products/1">Supplier Products</Link> — Manage supplier products</li>
                </ul>
            </div>
        </>
    )
} export default Home;
