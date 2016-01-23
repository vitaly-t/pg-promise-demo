var sql = require('../sql');

module.exports = function (obj) {
    return {
        create: function () {
            return obj.none(sql.products.create);
        },

        drop: function () {
            return obj.none(sql.products.drop);
        },

        empty: function () {
            return obj.none(sql.products.empty);
        },

        // example of mapping HTTP requests directly
        // into our our query formatting parameters;
        add: function (values) {
            return obj.one(sql.products.add, values)
                .then(function (user) {
                    return user.id;
                });
        }
    };
};
