/*
    Quickly deletes all records from table Users
    and all dependent records from table Products.

    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/
TRUNCATE TABLE ${schema~}.Users CASCADE;
