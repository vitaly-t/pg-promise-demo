/*
    Creates table Products.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

CREATE TABLE ${schema~}.Products
(
    id serial PRIMARY KEY,
    userId int not null references Users(id),
    name text NOT NULL
);
