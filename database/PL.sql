-----------
-- Views --
-----------

-- View Products
drop view if exists view_products;
CREATE VIEW view_products
AS
select productID as 'id', 
    productName as "product", 
    Brands.brandName as "brand", 
    Flavors.flavorName as "flavor", 
    ProteinTypes.proteinType as "protein", 
    cost as "price", 
    stockQuantity as "inventory" 
from Products 
    join Brands on Brands.brandID = Products.brandID 
    join ProteinTypes on ProteinTypes.proteinTypeID = Products.proteinTypeID 
    join Flavors on Flavors.flavorID = Products.flavorID
order by id asc;


-- View Customers
drop view if exists view_customers;
CREATE VIEW view_customers
AS
select customerID as "id",
    customerName as "name",
    phoneNumber as "phone",
    address as "address"
from Customers
order by customerID asc;


-- View Suppliers
drop view if exists view_suppliers;
create view view_suppliers
as
select supplierID as "id",
    supplierName as "supplier",
    contactName as "contact",
    supplierPhoneNumber as "number",
    supplierAddress as "address"
from Suppliers
order by supplier asc;


-- View Brands
drop view if exists view_brands;
create view view_brands
as
select brandID as 'id',
    brandName as 'name'
from Brands
order by id asc;


-- View Protein Types
drop view if exists view_proteins;
create view view_proteins
as
select proteinTypeID as 'id',
    proteinType as 'type'
from ProteinTypes
order by id asc;


-- View Flavors
drop view if exists view_flavors;
create view view_flavors
as
select flavorID as 'id',
    flavorName as 'name'
from Flavors
order by id asc;


-- View Invoices
drop view if exists view_invoices;
create view view_invoices
as
select Invoices.invoiceID as "id",
    Invoices.orderDate as "date",
    Customers.customerName as "customer",
    Invoices.totalCost as "total"
from Invoices
    join Customers on Customers.customerID = Invoices.customerID
order by id asc;










-----------------------
-- Insert Procedures --
-----------------------

-- Add a new Product
drop procedure if exists add_product;
delimiter //
create procedure add_product(
    in newProductName varchar(100),
    in newCost decimal(10,2),
    in newBrandID int,
    in newProteinTypeID int,
    in newFlavorID int,
    in newStockQuantity int,
    out productID int
)
begin
    insert into Products (
        productName,
        cost,
        brandID,
        proteinTypeID,
        flavorID,
        stockQuantity
    )
    values (
        newProductName,
        newCost,
        newBrandID,
        newProteinTypeID,
        newFlavorID,
        newStockQuantity
    );
    set productID = last_insert_id();
end //
delimiter ; 


-- Add new Customer
drop procedure if exists add_customer;
delimiter //
create procedure add_customer(
    in newCustomerName varchar(100),
    in newPhoneNumber varchar(20),
    in newAddress varchar(100),
    out customerID int
)
begin
    insert into Customers(customerName, phoneNumber, address)
    values (newCustomerName, newPhoneNumber, newAddress);
    set customerID = last_insert_id();
end //
delimiter ;


-- Add new Invoice
drop procedure if exists add_invoice;
delimiter //
create procedure add_invoice(
    in newCustomerID int,
    in newTotalCost decimal(10,2),
    in newOrderDate date,
    out invoiceID int
)
begin
    insert into Invoices(customerID, totalCost, orderDate)
    values (newCustomerID, newTotalCost, newOrderDate);
    set invoiceID = last_insert_id();
end //
delimiter ;






-- Update Procedures --

-- Delete Procedures --