/*
    The Protein Bros
    CS 340 Group 39
        Tesneem El-kheir
        Brendon Wong
        Alec Ilstrup
*/

SET foreign_key_checks = 0;
SET autocommit = 0;
START TRANSACTION;

--
-- Records the details of the customers we do business with, 
-- stores their contact information for order association and communication. 
--

DROP TABLE IF EXISTS Customers;
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

DROP TABLE IF EXISTS Invoices;
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

DROP TABLE IF EXISTS Brands;
CREATE TABLE Brands (
    brandID INT NOT NULL AUTO_INCREMENT,
    brandName VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (brandID)
);

--
-- Records the details about the type of protein used in each product 
--

DROP TABLE IF EXISTS ProteinTypes;
CREATE TABLE ProteinTypes (
    proteinTypeID INT NOT NULL AUTO_INCREMENT,
    proteinType VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (proteinTypeID)
);

--
-- Records the details of each flavor a product can come in, allowing products to be
-- grouped and identified by taste.  
--

DROP TABLE IF EXISTS Flavors;
CREATE TABLE Flavors (
    flavorID INT NOT NULL AUTO_INCREMENT,
    flavorName VARCHAR(100) UNIQUE NOT NULL,
    PRIMARY KEY (flavorID)
);

--
-- Records the details of each product available for sale, including its name, cost, 
-- brand, protein type and flavors. 
--

DROP TABLE IF EXISTS Products;
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

DROP TABLE IF EXISTS InvoiceDetails;
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
        ON DELETE cascade,
    FOREIGN KEY (productID)
        REFERENCES Products(productID)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

--
-- Records information about the suppliers from whom the company purchases products for its inventory. 
--

DROP TABLE IF EXISTS Suppliers;
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

DROP TABLE IF EXISTS SupplierProducts;
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
        (select brandID from Brands where brandName = "Optimum Nutrition"),
        (select proteinTypeID from ProteinTypes where proteinType = "Whey"),
        (select flavorID from Flavors where flavorName = "Chocolate"),
        240
    ),
    (
        'ISO100',
        39.99,
        (select brandID from Brands where brandName = "Dynamatize"),
        (select proteinTypeID from ProteinTypes where proteinType = "Whey"),
        (select flavorID from Flavors where flavorName = "Cookies & Cream"),
        180
    ),
    (
        'Sport Plant-Based Protein',
        34.99,
        (select brandID from Brands where brandName = "Garden of Life"),
        (select proteinTypeID from ProteinTypes where proteinType = "Pea"),
        (select flavorID from Flavors where flavorName = "Vanilla"),
        95
    ),
    (
        'Casein+',
        64.99,
        (select brandID from Brands where brandName = "Legion"),
        (select proteinTypeID from ProteinTypes where proteinType = "Casein"),
        (select flavorID from Flavors where flavorName = "Chocolate"),
        60
    ),
    (
        'Grass-Fed Whey Protein Isolate',
        59.99,
        (select brandID from Brands where brandName = "Transparent Labs"),
        (select proteinTypeID from ProteinTypes where proteinType = "Whey"),
        (select flavorID from Flavors where flavorName = "Salted Caramel"),
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
        (select productID from Products where productName = "Grass-Fed Whey Protein Isolate"),
        (select supplierID from Suppliers where supplierName = "Europa Sports Products")
    ),
    (
        45.49,
        (select productID from Products where productName = "Casein+"),
        (select supplierID from Suppliers where supplierName = "Europa Sports Products")
    ),
    (
        24.49,
        (select productID from Products where productName = "Sport Plant-Based Protein"),
        (select supplierID from Suppliers where supplierName = "Muscle Foods USA")
    ),
    (
        27.99,
        (select productID from Products where productName = "ISO100"),
        (select supplierID from Suppliers where supplierName = "UNFI")
    ),
    (
        27.99,
        (select productID from Products where productName = "Gold Standard 100% Whey"),
        (select supplierID from Suppliers where supplierName = "Muscle Foods USA")
    ),
    (
        28.49,
        (select productID from Products where productName = "Gold Standard 100% Whey"),
        (select supplierID from Suppliers where supplierName = "UNFI")
    );


INSERT INTO Customers (customerName, phoneNumber, address)
VALUES
    ('John Forman', '425-555-1234', '123 Main St'),
    ('Dean Smith', '718-555-5678', '456 Oak Ave'),
    ('Bob Marley', '206-555-9012', '789 Pine Rd');


INSERT INTO Invoices (customerID, totalCost, orderDate)
VALUES
    (
        (select customerID from Customers where customerName = "John Forman"),
        104.97,
        '2025-01-14'
    ),
    (
        (select customerID from Customers where customerName = "Dean Smith"),
        39.99,
        '2025-04-02'
    ),
    (
        (select customerID from Customers where customerName = "Bob Marley"),
        99.98,
        '2025-07-19'
    ),
    (
        (select customerID from Customers where customerName = "John Forman"),
        59.99,
        '2025-10-08'
    );

INSERT INTO InvoiceDetails (quantityOrdered, invoiceID, productID, priceAtSale)
VALUES
    (
        2,
        1,
        (select productID from Products where productName = "Gold Standard 100% Whey"),
        34.99
    ),
    (
        1,
        1,
        (select productID from Products where productName = "Sport Plant-Based Protein"),
        34.99
    ),
    (
        1,
        2,
        (select productID from Products where productName = "ISO100"),
        39.99
    ),
    (
        1,
        3,
        (select productID from Products where productName = "Casein+"),
        64.99
    ),
    (
        1,
        3,
        (select productID from Products where productName = "Sport Plant-Based Protein"),
        34.99
    ),
    (
        1,
        4,
        (select productID from Products where productName = "Grass-Fed Whey Protein Isolate"),
        59.99
    );

SET foreign_key_checks = 1;
COMMIT;
