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
                .then(function (user) {
                    return user.id;
                });
        },

        // Deletes a product from id, and returns a boolean indicating
        // whether the product with such id did exist;
        remove: function (id) {
            return obj.result("DELETE FROM Products WHERE id=$1", id)
                .then(function (result) {
                    return result.rowCount === 1;
                });
        },

        // Tries to find a product from id;
        find: function (id) {
            return obj.oneOrNone("SELECT * FROM Products WHERE id = $1", id);
        },

        // Returns all the records;
        all: function () {
            return obj.any("SELECT * FROM Products");
        },

        // Returns the total number of records;
        total: function () {
            return obj.one("SELECT count(*) FROM Products")
                .then(function (data) {
                    return data.count;
                });
        }

    };
};
