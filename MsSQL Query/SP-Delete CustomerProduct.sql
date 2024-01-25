CREATE PROCEDURE DeleteCustomerProduct
@ID INT
AS
BEGIN
    DELETE FROM customer_product_details WHERE ID = @ID;
END;