-- Queries that the app uses to let users interact with data (select/insert/update/delete)

----------------------
-- Products Queries --
----------------------

-- Get all Products data to display in the Products page
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

-- get Brand ID and Name to populate Brands dropdown
select brandID, brandName
from Brands;

-- get Protein Type ID and Name to populate Protein Type dropdown
select proteinTypeID, proteinType
from ProteinTypes;

-- get Flavor ID and Name to populate Flavors dropdown
select flavorID, flavorName
from Flavors;

-- get a Product's data for the Update form
select Products.productID, Products.productName, Products.cost, Products.stockQuantity,
Brands.brandName, ProteinTypes.proteinType, Flavors.flavorName
from Products
    join Brands on Brands.brandID = Products.brandID
    join ProteinTypes on ProteinTypes.proteinTypeID = Products.proteinTypeID
    join Flavors on Flavors.flavorID = Products.flavorID
where Products.productID = :selected_product_ID

-- update a Product's data given its ID
update Products
    set productName = :productNameInput, cost = :costInput, stockQuantity = :stockQuantityInput,
    brandID = :brandIDInput, proteinTypeID = :proteinTypeIDInput, flavorID = :flavorIDInput
    where productID = :selectedProductID;

-- delete a Product's data given its ID
delete from Products
where productID = :selectedProductID;




------
-- Customers Queries
------

-- Populate table in Customers page to display all customers and their data
select customerID as "Customer ID", customerName as "Customer", phoneNumber as "Phone Number",
address as "Address"
from Customers
order by customerID asc;


------
-- Invoice Queries
------



-----------------------
-- Suppliers Queries --
-----------------------

-- retrieve Suppliers info to populate supplier page
select supplierName as "Supplier", contactName as "Contact",
supplierPhoneNumber as "Phone Number", supplierAddress as "Address"
from Suppliers;


------
-- Brands Queries
------



------
-- Protein Types Queries
------



------
-- Flavors Queries
------



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


