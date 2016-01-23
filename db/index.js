// Bluebird is the best promise library available today,
// and as such it is the recommended one:
var promise = require('bluebird');

// Loading all the database repositories:
var repos = {
    users: require('./repos/users'),
    products: require('./repos/products')
};

// pg-promise initialization options:
var options = {

    // Capitalize all transaction commands:
    capTX: true,

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extend the database protocol with our repositories:
    extend: function () {
        this.users = repos.users(this);
        this.products = repos.products(this);
    }

};

// Load and initialize pg-promise:
var pgp = require('pg-promise')(options);

// Load and initialize our error logging:
var logger = require('./logger');
logger.init(options);

// Database connection parameters:
var config = {
    host: 'localhost',
    port: 5432,
    database: 'pg-promise-demo',
    user: 'postgres'
};

// Accessing the internal PG instance to increase the default pool size
// to 100 connections (from the default of 10), not as a requirement,
// just to show how this can be done:
pgp.pg.defaults.poolSize = 100;

module.exports = {

    // Library instance is often necessary to access all the useful
    // types and namespaces available within the library's root:
    pgp: pgp,

    // Database instance. Only one instance per database is needed
    // within any application.
    db: pgp(config)
};
