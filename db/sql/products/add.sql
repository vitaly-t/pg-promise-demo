/*
    Adds a new product for a specified user;
*/
INSERT INTO Products(userId, name)
VALUES(${userId}, ${name}) -- parameter names come directly from the HTTP handler;
RETURNING id
