var promise = require('bluebird');

var repos = {
    users: require('./repos/users'),
    products: require('./repos/products')
};

var options = {
    capTX: true,
    promiseLib: promise,
    extend: function () {
        this.users = repos.users(this);
        this.products = repos.products(this);
    }
};

var pgp = require('pg-promise')(options);
var log = require('./logger')(options);

var db = pgp("");

module.exports = {
    pgp: pgp,
    db: db
};
