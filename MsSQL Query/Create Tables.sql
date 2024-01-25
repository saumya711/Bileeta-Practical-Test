CREATE TABLE customers (
    CustomerCode VARCHAR(10) PRIMARY KEY,
    CustomerName VARCHAR(50) NOT NULL
);


INSERT INTO customers (CustomerCode, CustomerName) VALUES
('C001', 'Amal'),
('C002', 'Kamal'),
('C003', 'Saman'),
('C004', 'Nayomi');


CREATE TABLE products (
    ProductCode VARCHAR(10) PRIMARY KEY,
	Price DECIMAL(10, 2) NOT NULL,
    ProductName VARCHAR(50) NOT NULL
);


INSERT INTO products (ProductCode, Price, ProductName) VALUES
('P001', '500.00', 'Product 01'),
('P002', '250.00', 'Product 02'),
('P003', '1500.00', 'Product 03'),
('P004', '3500.00', 'Product 04');


CREATE TABLE orders (
    OrderID INT PRIMARY KEY IDENTITY(1,1),
    CustomerCode VARCHAR(10) REFERENCES customers(CustomerCode),
    SubTotal DECIMAL(10, 2),
    DiscountTotal DECIMAL(10, 2),
    NetTotal DECIMAL(10, 2)
);

CREATE TABLE customer_product_details (
    ID INT PRIMARY KEY IDENTITY(1,1),
	CustomerCode VARCHAR(10) REFERENCES customers(CustomerCode),
    ProductCode VARCHAR(10) REFERENCES products(ProductCode),
    Quantity INT,
    UnitPrice DECIMAL(10, 2),
    TotalAmount DECIMAL(10, 2)
);
