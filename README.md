pg-promise-demo
===============

This is an advanced demo of the best practices of using [pg-promise], and managing your database architecture.

The architecture presented here may be an overkill for a simple application, because the purpose of this demo
is mostly to show how to build scalable database products.

It shows how to organize an enterprise-level database application, with consideration for an ever-growing database
complexity and involvement of many developers.

Database aspects implemented in the demo:

* The best way to organize your database module
* How to organize and use database repositories
* How to organize, initialize and use SQL files
* Efficient diagnostics and errors reporting

The demo uses ES6 syntax, and therefore requires Node.JS 4.x or later.

### Running the app

You can either clone it or install via `$ npm install pg-promise-demo`.

This demo is mostly for you to look through its source code to understand its structure and the overall approach.
It is also simple enough that running it isn't really necessary.

However, if you do want to run this application locally, you need to provide an empty test database, according to
[its connection](https://github.com/vitaly-t/pg-promise-demo/blob/master/db/index.js#L31).

Then you can start it with `node index.js`, and fire away URL commands in a browser, as per the web API implemented
within [index.js](https://github.com/vitaly-t/pg-promise-demo/blob/master/index.js), while watching what's happening in:

* the console output (make sure you have NODE_ENV=`development`)
* errors log - file `db/errors.log`

The application implements two tables: Users->Products as one-to-many, both need to be created first via commands
`/users/create` and then `products/create`.

Examples:
```
localhost:3000/users/create
localhost:3000/users/init
localhost:3000/products/create
```

[pg-promise]:https://github.com/vitaly-t/pg-promise
[pg-monitor]:https://github.com/vitaly-t/pg-monitor
