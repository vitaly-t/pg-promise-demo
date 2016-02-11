'use strict';

var sql = require('../sql').products;

module.exports = function (obj) {

    /*
     This repository mixes hard-coded and dynamic SQL,
     primarily to show a diverse example of using both.
     */

    return {

        // Creates the table;
        create: function () {
            return obj.none(sql.create);
        },

        // Drops the table;
        drop: function () {
            return obj.none(sql.drop);
        },

        // Removes all records from the table;
        empty: function () {
            return obj.none(sql.empty);
        },

        // Adds a new record and returns the new id;
        add: function (values) {
            // example of mapping HTTP requests directly
            // into our our query formatting parameters;
            return obj.one(sql.add, values)
                .then(user=>user.id);
        },

        // Tries to delete a product from id, and returns
        // the number of records deleted;
        remove: function (id) {
            return obj.result("DELETE FROM Products WHERE id=$1", id)
                .then(result=>result.rowCount);
        },

        // Tries to find a product from id;
        find: function (id) {
            return obj.oneOrNone("SELECT * FROM Products WHERE id = $1", id);
        },

        // Returns all the records;
        all: function () {
            return obj.any("SELECT * FROM Products");
        },

        // Returns the total number of products;
        total: function () {
            return obj.one("SELECT count(*) FROM Products")
                .then(data=>data.count);
        }

    };
};
