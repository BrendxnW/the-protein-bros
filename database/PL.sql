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