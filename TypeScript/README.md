## TypeScript 4.x implementation of pg-promise-demo

The project is configured to transpile into ES2020, and requires Node.js v10.0.0 or later.

### Prerequisites

* Node.js v10.0.0 or later
* TypeScript 4.x, installed globally via command `npm install typescript -g`

### Installation

* Set up an empty test database, according to the connection details in [db-config.json](https://github.com/vitaly-t/pg-promise-demo/blob/master/db-config.json),
  which you can also change to fit your own test environment.
* Install Node.js dependencies, by running `npm install` from the project's root folder.

### Starting

* Navigate into folder `TypeScript`, and run `tsc` there to generate all `.js` files.
* Run the HTTP service with `node index.js` command.
* Proceed with the [steps on the main page].

[steps on the main page]:https://github.com/vitaly-t/pg-promise-demo
