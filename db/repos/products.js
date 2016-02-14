'use strict';

var sql = require('../sql').products;

module.exports = rep => {

    /*
     This repository mixes hard-coded and dynamic SQL,
     primarily to show a diverse example of using both.
     */

    return {

        // Creates the table;
        create: () => {
            return rep.none(sql.create);
        },

        // Drops the table;
        drop: () => {
            return rep.none(sql.drop);
        },

        // Removes all records from the table;
        empty: () => {
            return rep.none(sql.empty);
        },

        // Adds a new record and returns the new id;
        add: values => {
            // example of mapping HTTP requests directly
            // into our our query formatting parameters;
            return rep.one(sql.add, values)
                .then(user=>user.id);
        },

        // Tries to delete a product from id, and returns
        // the number of records deleted;
        remove: id => {
            return rep.result("DELETE FROM Products WHERE id=$1", id)
                .then(result=>result.rowCount);
        },

        // Tries to find a product from id;
        find: id => {
            return rep.oneOrNone("SELECT * FROM Products WHERE id = $1", id);
        },

        // Returns all the records;
        all: () => {
            return rep.any("SELECT * FROM Products");
        },

        // Returns the total number of products;
        total: () => {
            return rep.one("SELECT count(*) FROM Products")
                .then(data=>data.count);
        }

    };
};
