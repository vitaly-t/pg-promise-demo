/// <reference path='../../typings/index.d.ts' />

// Bluebird is the best promise library available today, and is the one recommended here:
import * as promise from 'bluebird';
import {IMain, IDatabase, IOptions} from 'pg-promise';

import users = require('./repos/users');
import products = require('./repos/products');

interface IExtensions {
    users: users.Repository,
    products: products.Repository
}

// pg-promise initialization options:
var options: IOptions<IExtensions> = {

    // Using a custom promise library, instead of the default ES6 Promise.
    // To make the custom promise protocol visible, you need to patch the
    // following file: node_modules/pg-promise/typescript/ext-promise.d.ts
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend: (obj: IExtensions, dc: any) => {
        // Do not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
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

var pgp: IMain = pgPromise(options);

// Create the database instance with extensions:
var db = <IDatabase<IExtensions> & IExtensions>pgp(config);

// Load and initialize optional diagnostics:
import diagnostics = require('./diagnostics');

diagnostics.init(options);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
export = db;
