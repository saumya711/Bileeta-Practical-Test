CREATE PROCEDURE GetCustomerProductById
@ID INT
AS
BEGIN
    SELECT * FROM customer_product_details WHERE ID = @ID;
END;
