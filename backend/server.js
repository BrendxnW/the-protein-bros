// ########################################
// ########## SETUP

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



// ########################################
// ########## ROUTE HANDLERS

// READ ROUTES
app.get('/products', async (req, res) => {
    try {
        const query1 = `select Products.productID as "Item ID", Products.productName as Product, \
            Brands.brandName as Brand \
            FROM Products \
            JOIN Brands ON Brands.brandID = Products.brandID;`;
        const query2 = 'SELECT * FROM Brands;';
        const [products] = await db.query(query1);
        const [brands] = await db.query(query2);
    
        res.status(200).json({ products, brands });

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});



// ########################################
// ########## LISTENER

app.listen(PORT, function () {
    console.log('Server running on port ' + PORT + '; press Ctrl-C to terminate.');
});
