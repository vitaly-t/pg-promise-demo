/*
    Adds a new product for a specified user.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/
INSERT INTO ${schema~}.Products(userId, name)
VALUES(${userId}, ${name}) -- parameter names come directly from the HTTP handler;
RETURNING id
