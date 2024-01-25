CREATE PROCEDURE UpdateCustomerOrder
@OrderID INT,
@CustomerCode VARCHAR(10),
@SubTotal DECIMAL(10, 2),
@DiscountTotal DECIMAL(10, 2),
@NetTotal DECIMAL(10, 2)
AS
BEGIN
    UPDATE orders
    SET
        CustomerCode = @CustomerCode,
        SubTotal = @SubTotal,
        DiscountTotal = @DiscountTotal,
		NetTotal = @NetTotal
    WHERE OrderID = @OrderID;
END;