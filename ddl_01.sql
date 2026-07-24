/*
    Protein Bros
    CS 340 Group 39
        Tesneem El-kheir
        Brendon Wong
        Alec Ilstrup
*/

set foreign_key_checks = 0;
set autocommit = 0;
start transaction;

--
-- Table definitions
--

drop table if exists Customers;
create table Customers (
    customerID int not null auto_increment,
    customerName varchar(100) not null,
    phoneNumber varchar(20) unique not null,
    address varchar(100),
    primary key (customerID)
);

drop table if exists Invoices;
create table Invoices (
    invoiceID int not null auto_increment,
    customerID int not null,
    totalCost decimal(10,2) not null,
    orderDate date not null,
    primary key (invoiceID),
    foreign key (customerID)
        references Customers(customerID)
        on update cascade
        on delete restrict
);

drop table if exists Brands;
create table Brands (
    brandID int not null auto_increment,
    brandName varchar(255) not null unique,
    primary key (brandID)
);

drop table if exists ProteinTypes;
create table ProteinTypes (
    proteinTypeID int not null auto_increment,
    proteinType varchar(100) unique not null,
    primary key (proteinTypeID)
);

drop table if exists Flavors;
create table Flavors (
    flavorID int not null auto_increment,
    flavorName varchar(100) unique not null,
    primary key (flavorID)
);

drop table if exists Products;
create table Products (
    productID int not null auto_increment,
    productName varchar(100) not null,
    cost decimal(10,2) not null,
    brandID int not null,
    proteinTypeID int not null,
    flavorID int not null,
    stockQuantity int not null,
    primary key (productID),
    foreign key (brandID)
        references Brands(brandID)
        on update cascade
        on delete restrict,
    foreign key (proteinTypeID)
        references ProteinTypes(proteinTypeID)
        on update cascade
        on delete restrict,
    foreign key (flavorID)
        references Flavors(flavorID)
        on update cascade
        on delete restrict
);

drop table if exists InvoiceDetails;
create table InvoiceDetails (
    invoiceDetailsID int not null auto_increment,
    quantityOrdered int not null,
    invoiceID int not null,
    productID int not null,
    priceAtSale decimal(10,2) not null,
    primary key (invoiceDetailsID),
    unique key (invoiceID, productID),
    foreign key (invoiceID)
        references Invoices(invoiceID)
        on update cascade
        on delete cascade,
    foreign key (productID)
        references Products(productID)
        on update cascade
        on delete restrict
);

drop table if exists Suppliers;
create table Suppliers (
    supplierID int not null auto_increment,
    supplierName varchar(100) not null,
    contactName varchar(100) not null,
    supplierPhoneNumber varchar(20) not null,
    supplierAddress varchar(100),
    primary key (supplierID)
);

drop table if exists SupplierProducts;
create table SupplierProducts (
    supplierProductID int not null auto_increment,
    wholesalePrice decimal(10,2) not null,
    productID int not null,
    supplierID int not null,
    primary key (supplierProductID),
    unique key (productID, supplierID),
    foreign key (productID)
        references Products(productID)
        on update cascade
        on delete restrict,
    foreign key (supplierID)
        references Suppliers(supplierID)
        on update cascade
        on delete restrict
);


--
-- Data addition
--

insert into Brands (brandName)
values
    ('Legion'),
    ('Optimum Nutrition'),
    ('Transparent Labs'),
    ('Dynamatize'),
    ('Garden of Life');

insert into ProteinTypes (proteinType)
values
    ('Whey'),
    ('Casein'),
    ('Soy'),
    ('Pea'),
    ('Custom Mix');

insert into Flavors (flavorName)
values
    ('Vanilla'),
    ('Chocolate'),
    ('Cookies & Cream'),
    ('Salted Caramel'),
    ('Unflavored');

insert into Products (productName, cost, brandID, proteinTypeID, flavorID, stockQuantity)
values
    ('Gold Standard 100% Whey', 34.99, 2, 1, 2, 50),
    ('ISO100', 39.99, 4, 1, 3, 40),
    ('Sport Plant-Based Protein', 34.99, 5, 4, 1, 30),
    ('Casein+', 64.99, 1, 2, 2, 25),
    ('Grass-Fed Whey Protein Isolate', 59.99, 3, 1, 4, 20);

insert into Suppliers (supplierName, contactName, supplierPhoneNumber, supplierAddress)
values
    ('UNFI', 'John Doe', '206-444-1111', '123 Maple St'),
    ('Europa Sports Products', 'Alex Smith', '718-333-2222', '987 Cedar Ln'),
    ('Muscle Foods USA', 'Jamie Lee', '718-999-5555', '426 Pine Rd');

insert into SupplierProducts (productID, supplierID, wholesalePrice)
values
    (5, 2, 41.99),
    (4, 2, 45.49),
    (3, 3, 24.49),
    (2, 1, 27.99),
    (1, 3, 27.99),
    (1, 1, 28.49);

insert into Customers (customerName, phoneNumber, address)
values
    ('John Forman', '425-555-1234', '123 Main St'),
    ('Dean Smith', '718-555-5678', '456 Oak Ave'),
    ('Bob Marley', '206-555-9012', '789 Pine Rd');


insert into Invoices (customerID, totalCost, orderDate)
values
    (1, 104.97, '2025-01-14'),
    (2, 39.99, '2025-04-02'),
    (3, 99.98, '2025-07-19'),
    (1, 59.99, '2025-10-08');

insert into InvoiceDetails (quantityOrdered, invoiceID, productID, priceAtSale)
values
    (2, 1, 1, 34.99),
    (1, 1, 3, 34.99),
    (1, 2, 2, 39.99),
    (1, 3, 4, 64.99),
    (1, 3, 3, 34.99),
    (1, 4, 5, 59.99);

set foreign_key_checks = 1;
commit;
