CREATE PROCEDURE GetOrderById
@OrderID INT
AS
BEGIN
    SELECT * FROM orders WHERE OrderID = @OrderID;
END;