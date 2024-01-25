CREATE PROCEDURE GetProductsByCustomer
@CustomerCode VARCHAR(10)
AS
BEGIN
    SELECT *
    FROM customer_product_details
    WHERE CustomerCode = @CustomerCode;
END;