pg-promise-demo
===============

This is an advanced demo of the best practices of using [pg-promise], and managing your database architecture.

It shows how to organize an enterprise-level database application, with consideration for ever-growing database complexity.

Database aspects implemented in the demo:

* The best way to organize your database module
* How to implement and use database repositories
* How to organize, initialize and use SQL files
* Efficient diagnostics and errors reporting

The demo includes two separate implementations, with identical functionality:

* [ES6 JavaScript implementation](https://github.com/vitaly-t/pg-promise-demo/tree/master/JavaScript)
* [TypeScript 2.x implementation](https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript)

### Installing & Running

You can either clone it or install via `$ npm install pg-promise-demo`.

This demo is here mostly for you to browse through its source code, understand its structure and the overall approach.
It is also simple enough that running it isn't really necessary.

However, if you do want to run this application locally, you need to build and and run it according to the type of implementation
that you are interested in. See details on the corresponding pages: [JavaScript] or [TypeScript].

Once the application is up and running, you can fire away URL commands in a browser, as per the web API that's implemented,
while watching what's happening in:

* the console output (make sure you have NODE_ENV=`development`)
* errors log - file `db/errors.log`

The application implements two tables: `Users->Products` as one-to-many, both need to be created first via commands
`/users/create` and then `products/create`.

Examples:
```
localhost:3000/users/create
localhost:3000/users/init
localhost:3000/products/create
```

[JavaScript]:https://github.com/vitaly-t/pg-promise-demo/tree/master/JavaScript
[TypeScript]:https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript
[pg-promise]:https://github.com/vitaly-t/pg-promise
[pg-monitor]:https://github.com/vitaly-t/pg-monitor
