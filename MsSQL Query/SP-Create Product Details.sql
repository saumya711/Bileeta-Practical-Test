CREATE PROCEDURE CreateProductDetails
@CustomerCode VARCHAR(10),
@ProductCode VARCHAR(20),
@Quantity INT,
@UnitPrice DECIMAL(10, 2),
@TotalAmount DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO customer_product_details (CustomerCode, ProductCode, Quantity, UnitPrice, TotalAmount)
    VALUES (@CustomerCode, @ProductCode, @Quantity, @UnitPrice, @TotalAmount);
END;