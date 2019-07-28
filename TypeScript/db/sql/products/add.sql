/*
    Adds a new Product for the specified User.
*/
INSERT INTO products(user_id, name)
VALUES(${userId}, ${productName})
RETURNING *
