var sql = require('../sql');

module.exports = function (obj) {
    return {
        // Create the table;
        create: function () {
            return obj.none(sql.products.create);
        },

        // Drops the table;
        drop: function () {
            return obj.none(sql.products.drop);
        },

        // Removes all records from the table;
        empty: function () {
            return obj.none(sql.products.empty);
        },

        // Adds a new record;
        add: function (values) {
            // example of mapping HTTP requests directly
            // into our our query formatting parameters;
            return obj.one(sql.products.add, values)
                .then(function (user) {
                    return user.id;
                });
        }
    };
};
