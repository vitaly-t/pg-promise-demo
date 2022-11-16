pg-promise-demo
===============

This is an advanced demo of the best practices of using [pg-promise], and managing your database architecture.

It shows how to organize an enterprise-level database application, with consideration for ever-growing complexity of the database and queries.

The demo focuses on the following:

* The best way to organize your database module
* Use of the _Repository_ pattern for your database
* Efficient use of queries via external SQL files
* Query monitoring and error diagnostics

The demo includes two separate implementations, with identical functionality:

* [ES7 JavaScript implementation](https://github.com/vitaly-t/pg-promise-demo/tree/master/JavaScript)
* [TypeScript 4.x implementation](https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript)

Each uses a basic HTTP service to let you quickly test db calls in a browser. Do not however reuse
any of the HTTP-service code, it is over-simplified, for the test, not for you to copy. The demo focus
is on the database layer only. 

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

The application implements two tables: `users->products` as one-to-many. Once the app is running, you should create
and populate those as the very first commands:

```
/users/create
/users/init
/products/create
```

After that see other supported API commands in the code:
 
```
/users/empty
/users/drop
/users/find/:id
/users/remove/:id
/users/all
/users/total

/products/drop
/products/empty
/products/add/:userId/:name
/products/find/:userId/:name
/products/remove/:id
/products/all
/products/total
```

[JavaScript]:https://github.com/vitaly-t/pg-promise-demo/tree/master/JavaScript
[TypeScript]:https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript
[pg-promise]:https://github.com/vitaly-t/pg-promise
[pg-monitor]:https://github.com/vitaly-t/pg-monitor
