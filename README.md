pg-promise-demo
===============

This is an advanced demo of the best practices of using [pg-promise], and managing
your database architecture.

The architecture presented here may be an overkill for a simple application, because
the purpose of this demo is mostly to show how to build serious database products.

It shows how to organize an enterprise-level database application, with consideration
for an ever-growing database complexity and involvement of many developers.

Database aspects implemented in the demo:

* The best way to organize your database module
* How to organize and use database repositories
* How to organize, initialize and use SQL files
* Efficient diagnostics and errors reporting

### Running the demo

If you want to run this application locally, all you need is to provide a test database,
according to [its connection](https://github.com/vitaly-t/pg-promise-demo/blob/master/db/index.js#L29).

Then you can start it with `node index.js`, and fire away URL commands in a browser,
as per the web API implemented within [index.js](https://github.com/vitaly-t/pg-promise-demo/blob/master/index.js),
while watching what's happening in:

* the console output (make sure you have NODE_ENV=`development`)
* errors log - file `db/errors.log`

The application implements two tables: Users->Products as one-to-many, both need to be created first
via commands `/users/create` and then `products/create`.

[pg-promise]:https://github.com/vitaly-t/pg-promise
[pg-monitor]:https://github.com/vitaly-t/pg-monitor
