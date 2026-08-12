-- Queries that the app uses to let users interact with data (select/insert/update/delete)

-- ----------------------
-- Products Queries --
-- ----------------------

-- Get all Products to display in the Products page
SELECT Products.productID AS "Item ID", Products.productName AS "Product", Brands.brandName AS "Brand",
Flavors.flavorName AS "Flavor", ProteinTypes.proteinType AS "Protein", Products.cost AS "Price"
FROM Products
    JOIN Brands ON Brands.brandID = Products.brandID
    JOIN ProteinTypes ON ProteinTypes.proteinTypeID = Products.proteinTypeID
    JOIN Flavors ON Flavors.flavorID = Products.flavorID;

-- Add a new product
INSERT INTO Products (productName, cost, brandID, proteinTypeID, flavorID, stockQuantity)
VALUES
    (:productNameInput, :costInput, :brandIDInput, :proteinTypeIDInput, :flavorIDInput, :stockQuantityInput);

-- Get Brand ID and Name to populate Brands dropdown
SELECT brandID, brandName
FROM Brands;

-- Get Protein Type ID and Name to populate Protein Type dropdown
SELECT proteinTypeID, proteinType
FROM ProteinTypes;

-- Get Flavor ID and Name to populate Flavors dropdown
SELECT flavorID, flavorName
FROM Flavors;

-- Get a Product's data for the Update form given its ID
SELECT productID, productName, cost, stockQuantity, brandID, proteinTypeID, flavorID
FROM Products
WHERE Products.productID = :selectedProductID;

-- Update a Product's data given its ID
UPDATE Products
    SET productName = :productNameInput, cost = :costInput, stockQuantity = :stockQuantityInput,
    brandID = :brandIDInput, proteinTypeID = :proteinTypeIDInput, flavorID = :flavorIDInput
WHERE productID = :selectedProductID;

-- Delete a Product's data given its ID
DELETE FROM Products
WHERE productID = :selectedProductID;



-- -----------------------
-- Customers Queries --
-- -----------------------

-- Get all Customers to display in the Customers page
SELECT customerID AS "Customer ID", customerName AS "Customer", phoneNumber AS "Phone Number",
address AS "Address"
FROM Customers
ORDER BY customerID ASC;

-- Add a new Customer
INSERT INTO Customers (customerName, phoneNumber, address)
VALUES (:customerNameInput, :phoneNumberInput, :addressInput);

-- Get a Customer's data for the Update form given their ID
SELECT customerID, customerName, phoneNumber, address
FROM Customers
WHERE customerID = :selectedCustomerID;

-- Update a Customer's data given their ID
UPDATE Customers
    SET customerName = :customerNameInput, phoneNumber = :phoneNumberInput, address = :addressInput
WHERE customerID = :selectedCustomerID;



-- ---------------------
-- Invoice Queries --
-- ---------------------

-- Get all Invoices to display in the Invoices page
SELECT Invoices.invoiceID AS "Invoice Number", Invoices.orderDate AS "Date",
Customers.customerName AS "Customer", Invoices.totalCost AS "Invoice Total"
FROM Invoices
    JOIN Customers ON Customers.customerID = Invoices.customerID
ORDER BY 'Invoice Number' ASC;

-- Add a new Invoice (done alongside new InvoiceDetails)
INSERT INTO Invoices (customerID, totalCost, orderDate)
VALUES (:customerIDInput, :totalCostCalculated, :orderDate);



-- -----------------------
-- Suppliers Queries --
-- -----------------------

-- Get all Suppliers to display in the Suppliers page
SELECT supplierID AS "Supplier ID", supplierName AS "Supplier", contactName AS "Contact",
supplierPhoneNumber AS "Phone Number", supplierAddress AS "Address"
FROM Suppliers;

-- Add new Supplier
INSERT INTO Suppliers (supplierName, contactName, supplierPhoneNumber, supplierAddress)
VALUES (:supplierNameInput, :contactNameInput, :supplierPhoneNumberInput, :supplierAddress);

-- Get a Supplier's data for the Update form given their ID
SELECT supplierID, supplierName, contactName, supplierPhoneNumber, supplierAddress
FROM Suppliers
WHERE supplierID = :selectedSupplierID;

-- Update a Supplier's data given their ID
UPDATE Suppliers
    SET supplierName = :supplierNameInput, contactName = :contactNameInput,
    supplierPhoneNumber = :supplierPhoneNumber, supplierAddress = :supplierAddressInput
WHERE supplierID = :selectedSupplierID;

-- Delete a Supplier given their ID
DELETE FROM Suppliers
WHERE supplierID = :selectedSupplierID;



-- --------------------
-- Brands Queries --
-- --------------------

-- Get all Brands to display in the Brands page
SELECT brandID, brandName
FROM Brands;


-- ---------------------------
-- Protein Types Queries --
-- ---------------------------

-- Get all Protein Types to display in the Protein types page
SELECT proteinTypeID, proteinType
FROM ProteinTypes;


-- ---------------------
-- Flavors Queries --
-- ---------------------

-- Get all the Flavors to display in the Flavors pages
SELECT flavorID, flavorName
FROM Flavors;


-- -----------------------------
-- Invoice Details Queries --
-- -----------------------------

-- Get invoice details of a specific invoice
SELECT InvoiceDetails.invoiceDetailsID, InvoiceDetails.invoiceID AS "Invoice ID",
Products.productName AS "Product", InvoiceDetails.quantityOrdered AS "Quantity",
InvoiceDetails.priceAtSale AS "Price"
FROM InvoiceDetails
    JOIN Invoices ON Invoices.invoiceID = InvoiceDetails.invoiceID
    JOIN Products ON Products.productID = InvoiceDetails.productID
WHERE Invoices.invoiceID = :invoiceID
ORDER BY InvoiceDetails.invoiceDetailsID;

-- Add new InvoiceDetails
INSERT INTO InvoiceDetails (invoiceID, productID, quantityOrdered, priceAtSale)
VALUES (:invoiceIDInput, :productIDInput, :quantityOrderedInput, :priceAtSaleGiven);



-- -------------------------------
-- Supplier Products Queries --
-- -------------------------------

-- Get all Products of a Supplier given the supplier ID to display in Supplier Products page
SELECT Products.productID AS "Item ID", Products.productName AS "Product",
SupplierProducts.wholesalePrice AS "Wholesale Price"
FROM SupplierProducts
    JOIN Products ON Products.productID = SupplierProducts.productID
    JOIN Suppliers ON Suppliers.supplierID = SupplierProducts.supplierID
WHERE Suppliers.supplierID = :supplierID;

-- Add new Supplier-Products relationship
INSERT INTO SupplierProducts (productID, supplierID)
VALUES (:productIDInput, :supplierIDInput);

-- Get all the Products of a Supplier given the supplier ID
SELECT supplierProductID, productID, supplierID, wholesalePrice
FROM SupplierProducts
WHERE supplierID = :selectedSupplierID;

-- Update the Products of a Supplier given the supplier ID
UPDATE SupplierProducts
    SET wholesalePrice = :wholesalePriceInput
WHERE supplierID = :selectedSupplierID AND productID = :selectedProductID;

-- Delete a Product from a Supplier given the supplier ID
DELETE FROM SupplierProducts
WHERE supplierID = :selectedSupplierID AND productID = :selectedProductID;
