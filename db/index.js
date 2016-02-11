'use strict';

// Bluebird is the best promise library available
// today, and it is the recommended one:
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

// Database connection parameters:
var config = {
    host: 'localhost',
    port: 5432,
    database: 'pg-promise-demo',
    user: 'postgres'
};

// Load and initialize pg-promise:
var pgp = require('pg-promise')(options);

// Create the database instance:
var db = pgp(config);

// Load and initialize all the diagnostics:
var diag = require('./diagnostics');
diag.init(options);

// Accessing the internal PG instance to increase the default pool size
// to 100 connections (from the default of 10), not as a requirement,
// just to show how this can be done:
pgp.pg.defaults.poolSize = 20;

module.exports = {

    // Library instance is often necessary to access all the useful
    // types and namespaces available within the library's root:
    pgp: pgp,

    // Database instance. Only one instance per database is needed
    // within any application.
    db: db
};
