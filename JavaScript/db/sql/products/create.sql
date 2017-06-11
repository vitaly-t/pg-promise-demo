/*
    Creates table Products.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

CREATE TABLE ${schema~}.products
(
    id serial PRIMARY KEY,
    user_id int not null references users(id),
    name text NOT NULL
)
