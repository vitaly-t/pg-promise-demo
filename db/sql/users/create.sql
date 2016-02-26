/*
    Creates table Users.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

CREATE TABLE ${schema~}.Users
(
    id serial PRIMARY KEY,
    name text NOT NULL
);