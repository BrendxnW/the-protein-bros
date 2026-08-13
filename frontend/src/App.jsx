import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Suppliers from './pages/Suppliers';
import Brands from './pages/Brands';
import ProteinTypes from './pages/ProteinTypes';
import Flavors from './pages/Flavors';
import Invoices from './pages/Invoices';
import CreateInvoice from './pages/CreateInvoice';
import AddProduct from './pages/AddProduct';
import AddCustomer from './pages/AddCustomer';
import InvoiceDetails from './pages/InvoiceDetails';
import SupplierProducts from './pages/SupplierProducts';
import EditProduct from './pages/EditProduct';
import EditCustomers from './pages/EditCustomers';

// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const URL = import.meta.env.VITE_URL;
const backendPort = import.meta.env.VITE_PORT;  
const backendURL = `${URL}`;


function App() {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home backendURL={backendURL} />} />
                <Route path="/products" element={<Products backendURL={backendURL} />} />
                <Route path="/customers" element={<Customers backendURL={backendURL} />} />
                <Route path="/suppliers" element={<Suppliers backendURL={backendURL} />} />
                <Route path="/brands" element={<Brands backendURL={backendURL} />} />
                <Route path="/proteintypes" element={<ProteinTypes backendURL={backendURL} />} />
                <Route path="/flavors" element={<Flavors backendURL={backendURL} />} />
                <Route path="/invoices" element={<Invoices backendURL={backendURL} />} />
                <Route path="/add-invoice" element={<CreateInvoice backendURL={backendURL} />} />
                <Route path="/add-product" element={<AddProduct backendURL={backendURL} />} />
                <Route path="/add-customer" element={<AddCustomer backendURL={backendURL} />} />
                <Route path="/invoice-details/:invoiceID" element={<InvoiceDetails backendURL={backendURL} />} />
                <Route path="/supplier-products/:supplierID" element={<SupplierProducts backendURL={backendURL} />} />
                <Route path="/edit-product/:productID" element={<EditProduct backendURL={backendURL} />} />
                <Route path="/edit-customer/:customerID" element={<EditCustomers backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;
