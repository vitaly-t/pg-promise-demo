/*
    Creates table Products;
*/

CREATE TABLE Products
(
    id serial PRIMARY KEY,
    userId int not null references Users(id),
    name text NOT NULL
);
