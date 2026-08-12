-- Active: 1785711094292@@127.0.0.1@3306@protein_bros
-- -----------
-- Views --
-- -----------

DROP VIEW IF EXISTS view_products;
DROP VIEW IF EXISTS view_customers;
DROP VIEW IF EXISTS view_suppliers;
DROP VIEW IF EXISTS view_brands;
DROP VIEW IF EXISTS view_proteins;
DROP VIEW IF EXISTS view_flavors;
DROP VIEW IF EXISTS view_invoices;
DROP VIEW IF EXISTS view_invoice_details;
DROP VIEW IF EXISTS view_supplier_products;
DROP VIEW IF EXISTS view_product_ids;

-- View Products
CREATE VIEW view_products
AS
SELECT productID AS id,
    productName AS product,
    Brands.brandName AS brand,
    Flavors.flavorName AS flavor,
    ProteinTypes.proteinType AS protein,
    cost AS price,
    stockQuantity AS inventory
FROM Products
    JOIN Brands ON Brands.brandID = Products.brandID
    JOIN ProteinTypes ON ProteinTypes.proteinTypeID = Products.proteinTypeID
    JOIN Flavors ON Flavors.flavorID = Products.flavorID
ORDER BY id ASC;

-- View Customers
CREATE VIEW view_customers
AS
SELECT customerID AS id,
    customerName AS name,
    phoneNumber AS phone,
    address AS address
FROM Customers
ORDER BY customerID ASC;

-- View Suppliers
CREATE VIEW view_suppliers
AS
SELECT supplierID AS id,
    supplierName AS supplier,
    contactName AS contact,
    supplierPhoneNumber AS number,
    supplierAddress AS address
FROM Suppliers
ORDER BY supplier ASC;

-- View Brands
CREATE VIEW view_brands
AS
SELECT brandID AS id,
    brandName AS name
FROM Brands
ORDER BY id ASC;

-- View Protein Types
CREATE VIEW view_proteins
AS
SELECT proteinTypeID AS id,
    proteinType AS type
FROM ProteinTypes
ORDER BY id ASC;

-- View Flavors
CREATE VIEW view_flavors
AS
SELECT flavorID AS id,
    flavorName AS name
FROM Flavors
ORDER BY id ASC;

-- View Invoices
CREATE VIEW view_invoices
AS
SELECT Invoices.invoiceID AS id,
    Invoices.orderDate AS date,
    Customers.customerName AS customer,
    Invoices.totalCost AS total
FROM Invoices
    JOIN Customers ON Customers.customerID = Invoices.customerID
ORDER BY id ASC;

-- View Invoice Details
CREATE VIEW view_invoice_details
AS
SELECT InvoiceDetails.invoiceDetailsID AS id,
    InvoiceDetails.invoiceID AS invoiceID,
    Products.productName AS product,
    InvoiceDetails.quantityOrdered AS quantity,
    InvoiceDetails.priceAtSale AS price
FROM InvoiceDetails
    JOIN Invoices ON Invoices.invoiceID = InvoiceDetails.invoiceID
    JOIN Products ON Products.productID = InvoiceDetails.productID
ORDER BY InvoiceDetails.invoiceDetailsID;

-- View Supplier Products
CREATE VIEW view_supplier_products
AS
SELECT Suppliers.supplierID AS supplierID,
    Products.productID AS productid,
    Products.productName AS product,
    SupplierProducts.wholesalePrice AS price
FROM SupplierProducts
    JOIN Products ON Products.productID = SupplierProducts.productID
    JOIN Suppliers ON Suppliers.supplierID = SupplierProducts.supplierID
ORDER BY productid ASC;

-- View all Products and IDs only
CREATE VIEW view_product_ids
AS
SELECT productID, productName AS Product
FROM Products
ORDER BY Products.productID ASC;

-- -----------------------
-- Insert Procedures --
-- -----------------------

-- Add a new Product
DROP PROCEDURE IF EXISTS add_product;
DELIMITER //

CREATE PROCEDURE add_product(
    IN newProductName VARCHAR(100),
    IN newCost DECIMAL(10,2),
    IN newBrandID INT,
    IN newProteinTypeID INT,
    IN newFlavorID INT,
    IN newStockQuantity INT,
    OUT productID INT
)
BEGIN
    INSERT INTO Products (
        productName,
        cost,
        brandID,
        proteinTypeID,
        flavorID,
        stockQuantity
    )
    VALUES (
        newProductName,
        newCost,
        newBrandID,
        newProteinTypeID,
        newFlavorID,
        newStockQuantity
    );
    SET productID = LAST_INSERT_ID();
END //

DELIMITER ;

-- Add new Customer
DROP PROCEDURE IF EXISTS add_customer;
DELIMITER //

CREATE PROCEDURE add_customer(
    IN newCustomerName VARCHAR(100),
    IN newPhoneNumber VARCHAR(20),
    IN newAddress VARCHAR(100),
    OUT customerID INT
)
BEGIN
    INSERT INTO Customers (customerName, phoneNumber, address)
    VALUES (newCustomerName, newPhoneNumber, newAddress);
    SET customerID = LAST_INSERT_ID();
END //

DELIMITER ;

-- Add new Invoice
DROP PROCEDURE IF EXISTS add_invoice;
DELIMITER //

CREATE PROCEDURE add_invoice(
    IN newCustomerID INT,
    IN newTotalCost DECIMAL(10,2),
    IN newOrderDate DATE,
    OUT invoiceID INT
)
BEGIN
    INSERT INTO Invoices (customerID, totalCost, orderDate)
    VALUES (newCustomerID, newTotalCost, newOrderDate);
    SET invoiceID = LAST_INSERT_ID();
END //

DELIMITER ;

-- Add new Supplier-Product relationship
DROP PROCEDURE IF EXISTS add_supplier_product;
DELIMITER //

CREATE PROCEDURE add_supplier_product(
    IN inputProductID INT,
    IN inputSupplierID INT,
    IN inputWholesale DECIMAL(10,2),
    OUT invoiceDetailsID INT
)
BEGIN
    INSERT INTO SupplierProducts (productID, supplierID, wholesalePrice)
    VALUES (inputProductID, inputSupplierID, inputWholesale);
    SET invoiceDetailsID = LAST_INSERT_ID();
END //

DELIMITER ;

-- -----------------------
-- Update Procedures --
-- -----------------------

-- Update a Supplier-Product relationship

DROP PROCEDURE IF EXISTS update_supplier_product;
DELIMITER //
CREATE PROCEDURE update_supplier_product(
    in inputSupplierID int,
    in inputProductID int,
    in inputWholesale decimal(10, 2)
)
BEGIN
    UPDATE SupplierProducts
    SET wholesalePrice = inputWholesale
    WHERE supplierID = inputSupplierID AND productID = inputProductID;
END //
DELIMITER ;




-- -----------------------
-- Delete Procedures --
-- -----------------------

-- Delete a Supplier-Product relationship
DROP PROCEDURE IF EXISTS delete_supplier_product;
DELIMITER //
CREATE PROCEDURE delete_supplier_product(
    IN inputSupplierID INT,
    IN inputProductID INT
)
BEGIN
    DECLARE error_message VARCHAR(255);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
    END;

    START TRANSACTION;
        DELETE FROM SupplierProducts
        WHERE supplierID = inputSupplierID AND productID = inputProductID;

        -- ROW_COUNT() returns the number of rows affected by the previous statement.
        IF ROW_COUNT() = 0 THEN
            SET error_message = 'No matching record found';
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
        END IF;
    COMMIT;
END //
DELIMITER ;
