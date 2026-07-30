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



// Components
import Navigation from './components/Navigation';

// Define the backend port and URL for API requests
const backendPort = 3900;  // Use the port you assigned to the backend server, this would normally go in a .env file
const backendURL = `http://classwork.engr.oregonstate.edu:${backendPort}`;

function App() {

    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products backendURL={backendURL} />} />
                <Route path="/customers" element={<Customers backendURL={backendURL} />} />
                <Route path="/suppliers" element={<Suppliers backendURL={backendURL} />} />
                <Route path="/brands" element={<Brands backendURL={backendURL} />} />
                <Route path="/proteintypes" element={<ProteinTypes backendURL={backendURL} />} />
                <Route path="/flavors" element={<Flavors backendURL={backendURL} />} />
                <Route path="/invoices" element={<Invoices backendURL={backendURL} />} />
            </Routes>
        </>
    );

} export default App;