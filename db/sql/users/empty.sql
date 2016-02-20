/*
    Quickly deletes all records from table Users
    and all dependent records from table Products

    NOTE: We only add schema here to demonstrate ability of class QueryFormat
    to pre-format SQL with static formatting parameters when needs to be.
*/
TRUNCATE TABLE ${schema~}.Users CASCADE;
