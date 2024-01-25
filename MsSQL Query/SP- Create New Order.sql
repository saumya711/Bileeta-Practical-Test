CREATE PROCEDURE CreateOrder
@CustomerCode VARCHAR(10),
@SubTotal DECIMAL(10, 2),
@DiscountTotal DECIMAL(5,2),
@NetTotal DECIMAL(10, 2)
AS
BEGIN
    INSERT INTO orders (CustomerCode,SubTotal,DiscountTotal, NetTotal  )
    VALUES (@CustomerCode, @SubTotal, @DiscountTotal, @NetTotal);
END;