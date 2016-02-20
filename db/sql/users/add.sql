/*
    Inserts a new user record;

    NOTE: We only add schema here to demonstrate ability of class QueryFormat
    to pre-format SQL with static formatting parameters when needs to be.
*/
INSERT INTO ${schema~}.Users(name)
VALUES($1)
RETURNING id
