DELIMITER $$
CREATE PROCEDURE CUSTOMER_DB.addnums(IN n1 int ,IN n2 int, OUT ans int )
BEGIN
 SET ans = n1 + n2;
END$$
DELIMITER ;


call CUSTOMER_DB.addnums(2,3,@ans);
SELECT @ans;