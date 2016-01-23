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
        }
    };
};
