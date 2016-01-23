/*
    Inserts a new user record;
*/
INSERT INTO Users(name)
VALUES($1)
RETURNING id
