/*
    Finds a product by user id + product name.
*/
SELECT * FROM products
WHERE user_id = ${userId} AND name = ${productName}
