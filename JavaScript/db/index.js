'use strict';

// Bluebird is the best promise library available today,
// and is the one recommended here:
var promise = require('bluebird');

// Loading all the database repositories separately,
// because event 'extend' is called multiple times:
var repos = {
    users: require('./repos/users'),
    products: require('./repos/products')
};

// pg-promise initialization options:
var options = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend: (obj, dc) => {

        // Do not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
        obj.users = new repos.users(obj, pgp);
        obj.products = new repos.products(obj, pgp);

        // Alternatively, you can set all repositories in a loop:
        //
        // for (var r in repos) {
        //    obj[r] = new repos[r](obj, pgp);
        // }
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

// Load and initialize optional diagnostics:
var diagnostics = require('./diagnostics');
diagnostics.init(options);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = db;
