// Setup
require("dotenv").config();

// Database
const db = require('./database/db-connector');

// Express
const express = require('express');
const app = express();

// Middleware
const cors = require('cors');
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests


const PORT = process.env.PORT;



// Route Handlers

// Products
app.get('/products', async (req, res) => {
    try {
        const query1 = 'select * from view_products';
        const [products] = await db.query(query1);
    
        res.status(200).json({ products });

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});


// Customers
app.get('/customers', async (req,res) => {
    try {
        const [customers] = await db.query(`select * from view_customers`);
        res.status(200).json({ customers });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
});


// Suppliers
app.get('/suppliers', async (req, res) => {
    try {
        const [suppliers] = await db.query(`select * from view_suppliers`);
        res.status(200).json({ suppliers });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
})

// Brands
app.get('/brands', async (req, res) => {
    try {
        const [brands] = await db.query(`select * from view_brands`);
        res.status(200).json({ brands });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
})














// Listener
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT + '; press Ctrl-C to terminate.');
});
