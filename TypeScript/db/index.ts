/// <reference path='../../typings/index.d.ts' />

// Bluebird is the best promise library available today, and is the one recommended here:
import * as promise from 'bluebird';

import users = require('./repos/users');
import products = require('./repos/products');

interface IExtensions {
    users:users.Repository,
    products:products.Repository
}

// pg-promise initialization options:
var options = {

    // Using a custom promise library, instead of the default ES6 Promise.
    // To make the custom promise protocol visible, you need to patch the
    // following file: node_modules/pg-promise/typescript/ext-promise.d.ts
    promiseLib: promise,

    // Extending the database protocol with our custom repositories:
    extend: (obj:any) => {
        // 1. Do not load repositories here, because this event occurs for every task
        //    and transaction being executed, which should be as fast as possible.
        // 2. We pass in `pgp` in case it is needed when implementing the repository;
        //    for example, to access namespaces `.as` or `.helpers`
        obj.users = new users.Repository(obj, pgp);
        obj.products = new products.Repository(obj, pgp);
    }

};

// Database connection parameters:
var config = {
    host: 'localhost',
    port: 5432,
    database: 'pg-promise-demo',
    user: 'postgres'
};

// Loading and initializing pg-promise:
import * as pgPromise from 'pg-promise';
var pgp = pgPromise(options);

// Create the database instance with extensions:
var db = <pgPromise.IDatabase<IExtensions>&IExtensions>pgp(config);

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
