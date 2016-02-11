'use strict';

var sql = require('../sql').users;

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

        // Initializes the table with some user records,
        // and return their id-s;
        init: function () {

            // When we execute more than one insert, we should use a transaction,
            // although in this particular example we use a single concatenated
            // insert, so transaction isn't needed. It is here just as an example.
            return obj.tx("Demo-Users", t=> {

                // Giving your tasks and transactions names
                // is a reliable way to track their errors.

                return t.any(sql.init)
                    .then(data=>data.map(m=> m.id));
            });
        },

        // Drops the table;
        drop: function () {
            return obj.none(sql.drop);
        },

        // Removes all records from the table;
        empty: function () {
            return obj.none(sql.empty);
        },

        // Adds a new user, and returns the new id;
        add: function (name) {
            return obj.one(sql.add, name)
                .then(user=>user.id);
        },

        // Tries to delete a user from id, and
        // returns the number of records deleted;
        remove: function (id) {
            return obj.result("DELETE FROM Users WHERE id=$1", id)
                .then(result=>result.rowCount);
        },

        // Tries to find a user from id;
        find: function (id) {
            return obj.oneOrNone("SELECT * FROM Users WHERE id = $1", id);
        },

        // Returns all the records;
        all: function () {
            return obj.any("SELECT * FROM Users");
        },

        // Returns the total number of users;
        total: function () {
            return obj.one("SELECT count(*) FROM Users")
                .then(data=>data.count);
        }
    };
};
