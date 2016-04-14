/// <reference path="../../typings/main" />
/// <reference path="../../node_modules/pg-promise/typescript/pg-promise.d.ts" />

// Bluebird is the best promise library available today,
// and is the one recommended here:
import * as promise from "bluebird";

import users = require('./repos/users');
import products = require('./repos/products');

interface Extensions {
    users:users.Repository;
    products:products.Repository;
}

// pg-promise initialization options:
var options = {
    
    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,
    
    // Extending the database protocol with our custom repositories:
    extend: obj => {
        obj.users = users.extend(obj);
        obj.products = products.extend(obj);
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
import * as pgPromise from 'pg-promise';
var pgp = pgPromise(options);

// Create the database instance:
var db = pgp<Extensions>(config);

// Load and initialize all the diagnostics:
import diag = require('./diagnostics');
diag.init(options);

// If you ever need to change the default pool size, here's an example:
// pgp.pg.defaults.poolSize = 20;

export = {
    
    // Library instance is often necessary to access all the useful
    // types and namespaces available within the library's root:
    pgp,
    
    // Database instance. Only one instance per database is needed
    // within any application.
    db
};
