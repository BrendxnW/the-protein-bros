/*
    The Protein Bros
    CS 340 Group 39
        Tesneem El-kheir
        Brendon Wong
        Alec Ilstrup
*/

SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;
START TRANSACTION;

DROP TABLE IF EXISTS SupplierProducts;
DROP TABLE IF EXISTS InvoiceDetails;
DROP TABLE IF EXISTS Invoices;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Suppliers;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Brands;
DROP TABLE IF EXISTS ProteinTypes;
DROP TABLE IF EXISTS Flavors;

--
-- Records the details of the customers we do business with, 
-- stores their contact information for order association and communication. 
--

CREATE TABLE Customers (
    customerID INT NOT NULL AUTO_INCREMENT,
    customerName VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(20) UNIQUE NOT NULL,
    address VARCHAR(100),
    PRIMARY KEY (customerID)
);

--
-- Records each sales transaction made by a customer, capturing who placed the order,
-- the details of the order, and the total amount charged. 
--

CREATE TABLE Invoices (
    invoiceID INT NOT NULL AUTO_INCREMENT,
    customerID INT NOT NULL,
    totalCost DECIMAL(10,2) NOT NULL,
    orderDate DATE NOT NULL,
    PRIMARY KEY (invoiceID),
    FOREIGN KEY (customerID)
        REFERENCES Customers(customerID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

--
-- Records the details of each brand, allowing products to be grouped and identified
-- by their manufacturer or label. 
--

CREATE TABLE Brands (
    brandID INT NOT NULL AUTO_INCREMENT,
    brandName VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (brandID)
);

--
-- Records the details about the type of protein used in each product 
--

CREATE TABLE ProteinTypes (
    proteinTypeID INT NOT NULL AUTO_INCREMENT,
    proteinType VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (proteinTypeID)
);

--
-- Records the details of each flavor a product can come in, allowing products to be
-- grouped and identified by taste.  
--

CREATE TABLE Flavors (
    flavorID INT NOT NULL AUTO_INCREMENT,
    flavorName VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (flavorID)
);

--
-- Records the details of each product available for sale, including its name, cost, 
-- brand, protein type and flavors. 
--

CREATE TABLE Products (
    productID INT NOT NULL AUTO_INCREMENT,
    productName VARCHAR(100) NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    brandID INT NOT NULL,
    proteinTypeID INT NOT NULL,
    flavorID INT NOT NULL,
    stockQuantity INT NOT NULL,
    PRIMARY KEY (productID),
    FOREIGN KEY (brandID)
        REFERENCES Brands(brandID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (proteinTypeID)
        REFERENCES ProteinTypes(proteinTypeID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (flavorID)
        REFERENCES Flavors(flavorID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

--
-- Records the individual line items of each invoice, functioning as an intersection table that 
-- resolves the M:N relationship between Invoices and Products by tracking each product and its 
-- quantity on a given invoice. 
--

CREATE TABLE InvoiceDetails (
    invoiceDetailsID INT NOT NULL AUTO_INCREMENT,
    quantityOrdered INT NOT NULL,
    invoiceID INT NOT NULL,
    productID INT NOT NULL,
    priceAtSale DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (invoiceDetailsID),
    UNIQUE KEY (invoiceID, productID),
    FOREIGN KEY (invoiceID)
        REFERENCES Invoices(invoiceID)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY (productID)
        REFERENCES Products(productID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

--
-- Records information about the suppliers from whom the company purchases products for its inventory.
--

CREATE TABLE Suppliers (
    supplierID INT NOT NULL AUTO_INCREMENT,
    supplierName VARCHAR(100) NOT NULL,
    contactName VARCHAR(100) NOT NULL,
    supplierPhoneNumber VARCHAR(20) NOT NULL,
    supplierAddress VARCHAR(100),
    PRIMARY KEY (supplierID)
);

--
-- Records the individual products provided by each supplier, functioning as an intersection table that
-- resolves the M:N relationship between Suppliers and Products. 
--

CREATE TABLE SupplierProducts (
    supplierProductID INT NOT NULL AUTO_INCREMENT,
    wholesalePrice DECIMAL(10,2) NOT NULL,
    productID INT NOT NULL,
    supplierID INT NOT NULL,
    PRIMARY KEY (supplierProductID),
    UNIQUE KEY (productID, supplierID),
    FOREIGN KEY (productID)
        REFERENCES Products(productID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (supplierID)
        REFERENCES Suppliers(supplierID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);


--
-- Data addition
--

INSERT INTO Brands (brandName)
VALUES
    ('Legion'),
    ('Optimum Nutrition'),
    ('Transparent Labs'),
    ('Dynamatize'),
    ('Garden of Life');

INSERT INTO ProteinTypes (proteinType)
VALUES
    ('Whey'),
    ('Casein'),
    ('Soy'),
    ('Pea'),
    ('Custom Mix');

INSERT INTO Flavors (flavorName)
VALUES
    ('Vanilla'),
    ('Chocolate'),
    ('Cookies & Cream'),
    ('Salted Caramel'),
    ('Unflavored');

INSERT INTO Products (productName, cost, brandID, proteinTypeID, flavorID, stockQuantity)
VALUES
    (
        'Gold Standard 100% Whey',
        34.99, 
        (SELECT brandID FROM Brands WHERE brandName = "Optimum Nutrition"),
        (SELECT proteinTypeID FROM ProteinTypes WHERE proteinType = "Whey"),
        (SELECT flavorID FROM Flavors WHERE flavorName = "Chocolate"),
        240
    ),
    (
        'ISO100',
        39.99,
        (SELECT brandID FROM Brands WHERE brandName = "Dynamatize"),
        (SELECT proteinTypeID FROM ProteinTypes WHERE proteinType = "Whey"),
        (SELECT flavorID FROM Flavors WHERE flavorName = "Cookies & Cream"),
        180
    ),
    (
        'Sport Plant-Based Protein',
        34.99,
        (SELECT brandID FROM Brands WHERE brandName = "Garden of Life"),
        (SELECT proteinTypeID FROM ProteinTypes WHERE proteinType = "Pea"),
        (SELECT flavorID FROM Flavors WHERE flavorName = "Vanilla"),
        95
    ),
    (
        'Casein+',
        64.99,
        (SELECT brandID FROM Brands WHERE brandName = "Legion"),
        (SELECT proteinTypeID FROM ProteinTypes WHERE proteinType = "Casein"),
        (SELECT flavorID FROM Flavors WHERE flavorName = "Chocolate"),
        60
    ),
    (
        'Grass-Fed Whey Protein Isolate',
        59.99,
        (SELECT brandID FROM Brands WHERE brandName = "Transparent Labs"),
        (SELECT proteinTypeID FROM ProteinTypes WHERE proteinType = "Whey"),
        (SELECT flavorID FROM Flavors WHERE flavorName = "Salted Caramel"),
        120
    );

INSERT INTO Suppliers (supplierName, contactName, supplierPhoneNumber, supplierAddress)
VALUES
    ('UNFI', 'John Doe', '206-444-1111', '123 Maple St'),
    ('Europa Sports Products', 'Alex Smith', '718-333-2222', '987 Cedar Ln'),
    ('Muscle Foods USA', 'Jamie Lee', '718-999-5555', '426 Pine Rd');

INSERT INTO SupplierProducts (wholesalePrice, productID, supplierID)
VALUES
    (
        41.99,
        (SELECT productID FROM Products WHERE productName = "Grass-Fed Whey Protein Isolate"),
        (SELECT supplierID FROM Suppliers WHERE supplierName = "Europa Sports Products")
    ),
    (
        45.49,
        (SELECT productID FROM Products WHERE productName = "Casein+"),
        (SELECT supplierID FROM Suppliers WHERE supplierName = "Europa Sports Products")
    ),
    (
        24.49,
        (SELECT productID FROM Products WHERE productName = "Sport Plant-Based Protein"),
        (SELECT supplierID FROM Suppliers WHERE supplierName = "Muscle Foods USA")
    ),
    (
        27.99,
        (SELECT productID FROM Products WHERE productName = "ISO100"),
        (SELECT supplierID FROM Suppliers WHERE supplierName = "UNFI")
    ),
    (
        27.99,
        (SELECT productID FROM Products WHERE productName = "Gold Standard 100% Whey"),
        (SELECT supplierID FROM Suppliers WHERE supplierName = "Muscle Foods USA")
    ),
    (
        28.49,
        (SELECT productID FROM Products WHERE productName = "Gold Standard 100% Whey"),
        (SELECT supplierID FROM Suppliers WHERE supplierName = "UNFI")
    );


INSERT INTO Customers (customerName, phoneNumber, address)
VALUES
    ('John Forman', '425-555-1234', '123 Main St'),
    ('Dean Smith', '718-555-5678', '456 Oak Ave'),
    ('Bob Marley', '206-555-9012', '789 Pine Rd');


INSERT INTO Invoices (customerID, totalCost, orderDate)
VALUES
    (
        (SELECT customerID FROM Customers WHERE customerName = "John Forman"),
        104.97,
        '2025-01-14'
    ),
    (
        (SELECT customerID FROM Customers WHERE customerName = "Dean Smith"),
        39.99,
        '2025-04-02'
    ),
    (
        (SELECT customerID FROM Customers WHERE customerName = "Bob Marley"),
        99.98,
        '2025-07-19'
    ),
    (
        (SELECT customerID FROM Customers WHERE customerName = "John Forman"),
        59.99,
        '2025-10-08'
    );

INSERT INTO InvoiceDetails (quantityOrdered, invoiceID, productID, priceAtSale)
VALUES
    (
        2,
        1,
        (SELECT productID FROM Products WHERE productName = "Gold Standard 100% Whey"),
        34.99
    ),
    (
        1,
        1,
        (SELECT productID FROM Products WHERE productName = "Sport Plant-Based Protein"),
        34.99
    ),
    (
        1,
        2,
        (SELECT productID FROM Products WHERE productName = "ISO100"),
        39.99
    ),
    (
        1,
        3,
        (SELECT productID FROM Products WHERE productName = "Casein+"),
        64.99
    ),
    (
        1,
        3,
        (SELECT productID FROM Products WHERE productName = "Sport Plant-Based Protein"),
        34.99
    ),
    (
        1,
        4,
        (SELECT productID FROM Products WHERE productName = "Grass-Fed Whey Protein Isolate"),
        59.99
    );

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
