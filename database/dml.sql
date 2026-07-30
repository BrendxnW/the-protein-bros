-- Queries that the app uses to let users interact with data (select/insert/update/delete)

----------------------
-- Products Queries --
----------------------

-- Get all Products to display in the Products page
select Products.productID as "Item ID", Products.productName as "Product", Brands.brandName as "Brand",
Flavors.flavorName as "Flavor", ProteinTypes.proteinType as "Protein", Products.cost as "Price"
from Products
    join Brands on Brands.brandID = Products.brandID
    join ProteinTypes on ProteinTypes.proteinTypeID = Products.proteinTypeID
    join Flavors on Flavors.flavorID = Products.flavorID;

-- Add a new product
insert into Products (productName, cost, brandID, proteinTypeID, flavorID, stockQuantity)
values
    (:productNameInput, :costInput, :brandIDInput, :proteinTypeIDInput, :flavorIDInput, :stockQuantityInput)

-- Get Brand ID and Name to populate Brands dropdown
select brandID, brandName
from Brands;

-- Get Protein Type ID and Name to populate Protein Type dropdown
select proteinTypeID, proteinType
from ProteinTypes;

-- Get Flavor ID and Name to populate Flavors dropdown
select flavorID, flavorName
from Flavors;

-- Get a Product's data for the Update form given its ID
select Products.productID, Products.productName, Products.cost, Products.stockQuantity,
Brands.brandName, ProteinTypes.proteinType, Flavors.flavorName
from Products
    join Brands on Brands.brandID = Products.brandID
    join ProteinTypes on ProteinTypes.proteinTypeID = Products.proteinTypeID
    join Flavors on Flavors.flavorID = Products.flavorID
where Products.productID = :selectedProductID;

-- Update a Product's data given its ID
update Products
    set productName = :productNameInput, cost = :costInput, stockQuantity = :stockQuantityInput,
    brandID = :brandIDInput, proteinTypeID = :proteinTypeIDInput, flavorID = :flavorIDInput
where productID = :selectedProductID;

-- Delete a Product's data given its ID
delete from Products
where productID = :selectedProductID;



-----------------------
-- Customers Queries --
-----------------------

-- Get all Customers to display in the Customers page
select customerID as "Customer ID", customerName as "Customer", phoneNumber as "Phone Number",
address as "Address"
from Customers
order by customerID asc;

-- Add a new Customer
insert into Customers (customerName, phoneNumber, address)
values (:customerNameInput, :phoneNumberInput, :addressInput);

-- Get a Customer's data for the Update form given their ID
select customerID, customerName, phoneNumber, address
from Customers
where customerID = :selectedCustomerID;

-- Update a Customer's data given their ID
update Customers
    set customerName = :customerNameInput, phoneNumber = :phoneNumberInput, address = :addressInput
where customerID = :selectedCustomerID



---------------------
-- Invoice Queries --
---------------------

-- Get all Invoices to display in the Invoices page
select Invoices.invoiceID as "Invoice Number", Invoices.orderDate as "Date", 
Customers.customerName as "Customer", Invoices.totalCost as "Invoice Total"
from Invoices
    join Customers on Customers.customerID = Invoices.customerID;

-- Add a new Invoice
insert into Invoices (customer)

-------------------------------------------------------------------------------
---------= WILL ALSO NEED TO DO AN INVOICEDETAILS ALONGSIDE IT
----------------------------------------------------------------------




-----------------------
-- Suppliers Queries --
-----------------------

-- Get all Suppliers to display in the Suppliers page
select supplierID as "Supplier ID", supplierName as "Supplier", contactName as "Contact",
supplierPhoneNumber as "Phone Number", supplierAddress as "Address"
from Suppliers;

-- Add new Supplier
insert into Suppliers (supplierName, contactName, supplierPhoneNumber, supplierAddress)
values (:supplierNameInput, :contactNameInput, :supplierPhoneNumberInput, :supplierAddress);

-- Get a Supplier's data for the Update form given their ID
select supplierID, supplierName, contactName, supplierPhoneNumber, supplierAddress
from Suppliers
where supplierID = :selectedSupplierID;

-- Update a Supplier's data given their ID
update Suppliers
    set supplierName = :supplierNameInput, contactName = :contactNameInput,
    supplierPhoneNumber = :supplierPhoneNumber, supplierAddress = :supplierAddressInput
where supplierID = :selectedSupplierID;

-- Delete a Supplier given their ID
delete from Suppliers
where supplierID = :selectedSupplierID;



--------------------
-- Brands Queries --
--------------------

-- Get all Brands to display in the Brands page
select brandID, brandName
from Brands;



------
-- Protein Types Queries
------

-- Get all Protein Types to display in the Protein types page
select proteinTypeID, proteinType
from ProteinTypes;



------
-- Flavors Queries
------
select flavorID, flavorName
from Flavors;



-----------------------------
-- Invoice Details Queries --
-----------------------------

-- Get invoice details of a specific invoice
select InvoiceDetails.invoiceDetailsID, InvoiceDetails.invoiceID as "Invoice ID",
Products.productName as "Product", InvoiceDetails.quantityOrdered as "Quantity",
InvoiceDetails.priceAtSale as "Price"
from InvoiceDetails
    join Invoices on Invoices.invoiceID = InvoiceDetails.invoiceID
    join Products on Products.productID = InvoiceDetails.productID
where Invoices.invoiceID = :invoiceID
order by InvoiceDetails.invoiceDetailsID;



-------------------------------
-- Supplier Products Queries --
-------------------------------

-- Get the list of products supplied by a specific vendor
select Products.productID as "Item ID", Products.productName as "Product",
SupplierProducts.wholesalePrice as "Wholesale Price"
from SupplierProducts
    join Products on Products.productID = SupplierProducts.productID
    join Suppliers on Suppliers.supplierID = SupplierProducts.supplierID
where Suppliers.supplierID = :supplierID;


