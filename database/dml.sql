-- Queries that the app uses to let users interact with data (select/insert/update/delete)

------
-- Products Queries
------

-- get all Products and their Brand, ProteinType, Flavor, and cost for the browse Products page
select Products.productID as "Item ID", Products.productName as "Product", Brands.brandName as "Brand",
Flavors.flavorName as "Flavor", ProteinTypes.proteinType as "Protein", Products.cost as "Price"
from Products
    join Brands on Brands.brandID = Products.brandID
    join ProteinTypes on ProteinTypes.proteinTypeID = Products.proteinTypeID
    join Flavors on Flavors.flavorID = Products.flavorID;



------
-- Customers Queries
------



------
-- Invoice Queries
------



------
-- Suppliers Queries
------



------
-- Brands Queries
------



------
-- Protein Types Queries
------



------
-- Flavors Queries
------



------
-- Invoice Details Queries
------

-- Get invoice details of a specific invoice
select InvoiceDetails.invoiceDetailsID, InvoiceDetails.invoiceID as "Invoice ID",
Products.productName as "Product", InvoiceDetails.quantityOrdered as "Quantity",
InvoiceDetails.priceAtSale as "Price"
from InvoiceDetails
    join Invoices on Invoices.invoiceID = InvoiceDetails.invoiceID
    join Products on Products.productID = InvoiceDetails.productID
where Invoices.invoiceID = :invoiceID
order by InvoiceDetails.invoiceDetailsID;

------
-- Supplier Products Queries
------



