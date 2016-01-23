var sql = require('../sql').users;

module.exports = function (obj) {

    return {

        // Creates the table;
        create: function () {
            return obj.none(sql.create);
        },

        // Initializes the table with some records;
        init: function () {
            // Since we are expecting multiple inserts in a single command,
            // we should execute it within a transaction, to make sure no
            // records are inserted, if at least one of them fails.
            return obj.tx("Demo-Users", function (t) {
                return t.none(sql.init);
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
                .then(function (user) {
                    return user.id;
                });
        },

        // Deletes a user from id, and returns a boolean indicating
        // whether the user with such id did exist;
        remove: function (id) {
            return obj.result("DELETE FROM Users WHERE id=$1", id)
                .then(function (result) {
                    return result.rowCount === 1;
                });
        },

        // Tries to find a user from id;
        find: function (id) {
            return obj.oneOrNone("SELECT * FROM Users WHERE id = $1", id);
        },

        // Returns all the records;
        all: function () {
            return obj.any("SELECT * FROM Users");
        },

        // Returns the total number of records;
        total: function () {
            return obj.one("SELECT count(*) FROM Users")
                .then(function (data) {
                    return data.count;
                });
        }
    };
};
