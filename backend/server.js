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

// View all Products
app.get('/products', async (req, res) => {
    try {
        const query1 = 'select * from view_products';
        const [products] = await db.query(query1);
    
        res.status(200).json({ products });

    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
    
});

// Reset
app.post('/reset', async (req, res) => {
    try {
        await db.query('CALL ResetDatabase();');
        res.status(200).json({ message: "Database reset successfully." });
    } catch (error) {
        console.error("Error resetting database:", error);
        res.status(500).json({ error: "An error occurred while resetting the database." });
    }
});

// View all Customers
app.get('/customers', async (req,res) => {
    try {
        const [customers] = await db.query(`select * from view_customers`);
        res.status(200).json({ customers });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
});


// View all Suppliers
app.get('/suppliers', async (req, res) => {
    try {
        const [suppliers] = await db.query(`select * from view_suppliers`);
        res.status(200).json({ suppliers });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// View all Brands
app.get('/brands', async (req, res) => {
    try {
        const [brands] = await db.query(`select * from view_brands`);
        res.status(200).json({ brands });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// View all Protein Types
app.get('/proteintypes', async (req, res) => {
    try {
        const [proteins] = await db.query(`select * from view_proteins`);
        res.status(200).json({ proteins });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// View all Flavors
app.get('/flavors', async (req, res) => {
    try {
        const [flavors] = await db.query(`select * from view_flavors`);
        res.status(200).json({ flavors });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// View all Invoices
app.get('/invoices', async (req, res) => {
    try {
        const [invoices] = await db.query(`select * from view_invoices`);
        res.status(200).json({ invoices });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// View Invoice Details
app.get(`/invoice-details/:invoiceID`, async (req, res) => {
    try {
        const {invoiceID} = req.params;
        const [invoiceDetails] = await db.query(`select * from view_invoice_details \
            where invoiceID = ?`, [invoiceID]);
        res.status(200).json({ invoiceDetails });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// View Supplier Products
app.get(`/supplier-products/:supplierID`, async (req, res) => {
    try {
        const {supplierID} = req.params;
        // Obtain list of products by a given supplier
        const [products] = await db.query(`select * from view_supplier_products \
            where supplierID = ?`, [supplierID]);
        // Obtain supplier name
        const [supplier] = await db.query(`select supplierName from Suppliers where supplierID = ?`,
            [supplierID]
        );
        // Comprehensive list of all products on app
        const [allProducts] = await db.query(`select * from view_product_ids;`);

        res.status(200).json({ products, supplier, allProducts });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// Add a new Invoice and its details to the database
app.post(`/add-invoice`, async(req, res) => {
    try {
        const {customerID, totalCost, orderDate, order} = req.body;
        await db.query(`call add_invoice(?, ?, ?, @invoiceID);`,
            [customerID, totalCost, orderDate]);
        const [response] = await db.query(`select @invoiceID as invoiceID;`);
        const newInvoiceID = response[0].invoiceID;

        for (const item of order) {
            const productID = item.productID;
            const price = item.price;
            const quantity = item.quantity;
            await db.query(`call add_invoice_details(?,?,?,?);`, 
                [newInvoiceID, productID, price, quantity]
            );
        };

        res.status(200).json({invoiceID: newInvoiceID});
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
});

// Get info needed to populate the Add Invoice page
app.get(`/add-invoice`, async(req, res) => {
    try {
        const [products] = await db.query(`select * from view_products;`);
        const [customers] = await db.query(`select customerID, customerName from Customers;`);
        res.status(200).json({ customers, products });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// Add a new Product
app.post(`/add-product`, async(req, res) => {
    try {
        // Destructure values from request body
        const {productName, cost, brandID, proteinTypeID, flavorID, stockQuantity} = req.body;
        // Send query to database
        await db.query(`call add_product(?, ?, ?, ?, ?, ?, @productID);`, [
            productName, cost, brandID, proteinTypeID, flavorID, stockQuantity
        ]);
        // Store ID of newly created product
        const [result] = await db.query(`select @productID as productID;`);
        res.status(200).json({productID: result[0].productID});
        console.log(`CREATE product: 
                ID: ${result[0].productID}
                NAME: ${productName}`);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})

// Get info needed to add a new product
app.get(`/add-product`, async(req, res) => {
    try {
        const [brands] = await db.query(`select brandID, brandName from Brands;`);
        const [proteins] = await db.query(`select proteinTypeID, proteinType from ProteinTypes;`);
        const [flavors] = await db.query(`select flavorID, flavorName from Flavors;`);

        res.status(200).json({ brands, proteins, flavors });
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// Add a new Customer
app.post(`/add-customer`, async(req, res) => {
    try {
        const {customerName, phoneNumber, address} = req.body;
        await db.query(`call add_customer(?, ?, ?, @customerID);`,
            [customerName, phoneNumber, address]
        );
        const [result] = await db.query(`select @customerID as customerID;`);
        res.status(200).json({productID: result[0].productID});
        
        console.log(`CREATE customer:
                ID: ${result[0].productID}
                NAME: ${customerName}`);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// Add new Product-Supplier relationship
app.post(`/supplier-products/:id`, async (req, res) => {
    try {
        const {addProductID, supplierID, addWholesale} = req.body;
        await db.query(`call add_supplier_product(?, ?, ?, @relationID);`,
            [addProductID, supplierID, addWholesale]
        );
        const [result] = await db.query(`select @relationID as relationID;`);
        res.status(200).json({relationID: result[0].relationID});

        console.log(`CREATE supplier-product`);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// Delete a Product-Supplier relationship
app.post(`/supplier-products/:id/delete`, async(req, res) => {
    try {
        const {supplierID, productID} = req.body;
        await db.query(`call delete_supplier_product(?, ?);`, [supplierID, productID]);
        
        res.status(200).send("okay");

        console.log(`DELETE supplierProducts
                    SupplierID: ${supplierID},
                    ProductID: ${productID}`);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})

// Update a Product-Supplier relationship
app.post(`/supplier-products/:id/update`, async(req, res) => {
    try {
        const {supplierID, editProductID, editWholesale} = req.body;
        await db.query(`call update_supplier_product(?,?,?);`, 
            [supplierID, editProductID, editWholesale]
        );

        res.sendStatus(200);

        console.log(`UPDATE supplierProducts
                    SupplierID: ${supplierID},
                    ProductID: ${editProductID},
                    Wholesale: ${editWholesale}`);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// Update an existing Product
app.post(`/edit-product/:id/update`, async(req, res) => {
    try {
        const {productID, productName, cost, stockQuantity, brandID, proteinTypeID, flavorID} = req.body;
        await db.query(`call update_product(?,?,?,?,?,?,?)`,
            [productID, productName, cost, stockQuantity, brandID, proteinTypeID, flavorID]
        );

        res.sendStatus(200)

        console.log(`UPDATE Product
                    ProductID: ${productID},
                    ProductName: ${productName},
                    Cost: ${cost},
                    Quantity: ${stockQuantity}`);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})


// Get the information of a single Product to populate the edit fields
app.get(`/edit-product/:id`, async(req, res) => {
    try {
        const {id} = req.params;
        const [product] = await db.query(`select * from view_product where productID = ?;`, [id])
        res.status(200).json({product});
    } catch(error) {
        console.error("Error executing queries:", error);
        res.status(500).json({error: "An error occurred while executing the database queries."});
    }
})

// Delete a Product given its ID
app.post(`/products/delete`, async(req, res) => {
    try {
        const {productID} = req.body;
        await db.query(`call delete_product(?);`, [productID]);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error executing queries:", error);
        res.status(500).json({ error: "An error occurred while executing the database queries." });
    }
})













// Listener
app.listen(PORT, function () {
    console.log('Server running on port ' + PORT + '; press Ctrl-C to terminate.');
});
