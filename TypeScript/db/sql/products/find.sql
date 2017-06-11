/*
    Finds a product by user id + product name.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

SELECT * FROM ${schema~}.products
WHERE user_id = ${userId} AND name = ${productName}
