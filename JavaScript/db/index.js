const promise = require('bluebird'); // best promise library today
const pgPromise = require('pg-promise'); // pg-promise core library
const dbConfig = require('../../db-config.json'); // db connection details
const {Diagnostics} = require('./diagnostics'); // optional diagnostics
const {Users, Products} = require('./repos');

// pg-promise initialization options:
const initOptions = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj, dc) {
        // Database Context (dc) is mainly useful when extending multiple databases with different access API-s.

        // Do not use 'require()' here, because this event occurs for every task and transaction being executed,
        // which should be as fast as possible.
        obj.users = new Users(obj, pgp);
        obj.products = new Products(obj, pgp);
    }
};

// Initializing the library:
const pgp = pgPromise(initOptions);

// Creating the database instance:
const db = pgp(dbConfig);

// Initializing optional diagnostics:
Diagnostics.init(initOptions);

// Alternatively, you can get access to pgp via db.$config.pgp
// See: https://vitaly-t.github.io/pg-promise/Database.html#$config
module.exports = {db, pgp};
