var sql = require('../sql');

module.exports = function (obj) {

    return {

        create: function () {
            console.log(sql.users.create.query);
            return obj.none(sql.users.create);
        },

        init: function () {
            // Since we are expecting multiple inserts in a single command,
            // we should execute it within a transaction, to make sure no
            // records are inserted, if at least one of them fails.
            return obj.tx("Add-Demo-Users", function (t) {
                return t.none(sql.users.init);
            });
        },

        drop: function () {
            return obj.none(sql.users.drop);
        },

        empty: function () {
            return obj.none(sql.users.empty);
        },

        // All methods below use in-line sql, because:
        // a. All sql used below is very simple;
        // b. It is easier to see the relation between a query
        //    string and its formatting parameters.

        // Adds a new user, and returns the new id;
        add: function (name, active) {
            return obj.one("INSERT INTO Users VALUES($1, $2) RETURNING id", [name, active])
                .then(function (user) {
                    return user.id;
                });
        },

        // Deletes a user from id, and returns a boolean indicating
        // whether the user with such id did exist;
        remove: function (id) {
            return obj.result("DELETE FROM Users WHERE id=", id)
                .then(function (result) {
                    return result.rowCount === 1;
                });
        },

        // Tries to find a user from id;
        find: function (id) {
            return obj.oneOrNone("SELECT * FROM Users WHERE id = $1", id);
        },

        all: function () {
            return obj.any("SELECT * FROM Users");
        },

        total: function () {
            return obj.one("SELECT count(*) FROM Users")
                .then(function (data) {
                    return data.count;
                });
        }
    };
};
