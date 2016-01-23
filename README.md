pg-promise-demo
===============

This is an advanced demo of the best practices of using [pg-promise], and managing
your database architecture.

The architecture presented here is an overkill for a simple application, because
the purpose of this demo is to show how to build serious database products.

It shows how to organize an enterprise-level database application, with consideration
for an ever-growing database complexity and involvement of many developers through an extensive
period of time.

Database aspects implemented in the demo:

* The best way to organize your database module
* How to organize and use database repositories
* How to organize, initialize and use SQL files
* Efficient diagnostics and errors reporting

### Running the demo

In order to run this application locally, all you need is to provide a test database,
according to [its connection](https://github.com/vitaly-t/pg-promise-demo/blob/master/db/index.js#L29).

Then you can start it with `node index.js`, and fire away URL commands in a browser,
as per the web API implemented within [index.js](https://github.com/vitaly-t/pg-promise-demo/blob/master/index.js)

The application implements two tables: Users(1)->(&infin;)Products.

[pg-promise]:https://github.com/vitaly-t/pg-promise
[pg-monitor]:https://github.com/vitaly-t/pg-monitor
