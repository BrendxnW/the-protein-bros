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
        const query1 = `select productID as 'id', \
            productName as "product", \
            Brands.brandName as "brand", \
            Flavors.flavorName as "flavor", \
            ProteinTypes.proteinType as "protein", \
            cost as "price", \
            stockQuantity as "inventory" \
            from Products \
            join Brands on Brands.brandID = Products.brandID \
            join ProteinTypes on ProteinTypes.proteinTypeID = Products.proteinTypeID \
            join Flavors on Flavors.flavorID = Products.flavorID
            order by id asc;`
        const [products] = await db.query(query1);
    
        res.status(200).json({ products });

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).send("An error occurred while executing the database queries.");
    }
    
});



// Listener
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT + '; press Ctrl-C to terminate.');
});
