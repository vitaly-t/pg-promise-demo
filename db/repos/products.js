var sql = require('../sql').products;

module.exports = function (obj) {

    /*
     This repository relies solely on the external SQL provider.
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
        }
    };
};
