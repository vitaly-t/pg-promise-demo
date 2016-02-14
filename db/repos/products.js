'use strict';

var sql = require('../sql').products;

module.exports = rep => {

    /*
     This repository mixes hard-coded and dynamic SQL,
     primarily to show a diverse example of using both.
     */

    return {

        // Creates the table;
        create: () => rep.none(sql.create),

        // Drops the table;
        drop: () => rep.none(sql.drop),

        // Removes all records from the table;
        empty: () => rep.none(sql.empty),

        // Adds a new record and returns the new id;
        add: values =>
            // example of mapping HTTP requests directly
            // into our our query formatting parameters;
            rep.one(sql.add, values)
                .then(user => user.id),

        // Tries to delete a product by id, and returns
        // the number of records deleted;
        remove: id => rep.result("DELETE FROM Products WHERE id = $1", id)
            .then(result => result.rowCount),

        // Tries to find a product from id;
        find: id => rep.oneOrNone("SELECT * FROM Products WHERE id = $1", id),

        // Returns all the records;
        all: () => rep.any("SELECT * FROM Products"),

        // Returns the total number of products;
        total: () => rep.one("SELECT count(*) FROM Products")
            .then(data => data.count)

    };
};
