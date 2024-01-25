CREATE PROCEDURE DeleteCustomerOrder
@OrderID INT
AS
BEGIN
    DELETE FROM orders WHERE OrderID = @OrderID;
END;