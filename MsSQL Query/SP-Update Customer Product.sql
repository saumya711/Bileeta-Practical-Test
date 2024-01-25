CREATE PROCEDURE UpdateCustomerProduct
@ID INT,
@CustomerCode VARCHAR(10),
@ProductCode VARCHAR(20),
@Quantity INT,
@UnitPrice DECIMAL(10, 2),
@TotalAmount DECIMAL(10, 2)
AS
BEGIN
    UPDATE customer_product_details
    SET
        CustomerCode = @CustomerCode,
        ProductCode = @ProductCode,
        Quantity = @Quantity,
        UnitPrice = @UnitPrice,
		TotalAmount = @TotalAmount
    WHERE ID = @ID;
END;