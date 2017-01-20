## JavaScript implementation of pg-promise-demo

This implementation uses ES6 syntax, and therefore requires Node.JS 4.x or later.
However, you can easily follow the same pattern with ES5 syntax, as [pg-promise] supports every version of Node.js from 0.10.x onwards.

### Prerequisites

* Node.js version 4.x or later

### Installation

* Set up an empty test database, according to the connection details in file [JavaScript/db/index.js](https://github.com/vitaly-t/pg-promise-demo/blob/master/JavaScript/db/index.js#38),
  which you can also change to fit your test environment.
* Install Node.js dependencies by running `npm install` from the project's root folder

### Starting

Navigate to the projects's root folder:

```
$ cd JavaScript
```

Run the application:

```
$ node index.js
```

[pg-promise]:https://github.com/vitaly-t/pg-promise
