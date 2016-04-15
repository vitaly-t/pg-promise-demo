### TypeScript implementation of pg-promise-demo

### Prerequisites

* Node.js version 0.10.x or later
* TypeScript, which you can install globally via command `npm install typescript -g`
* Typings, which you can install globally via command `npm install typings -g`

### Installation

* Set up a test database according to the connection details in file [JavaScript\db\index.js](https://github.com/vitaly-t/pg-promise-demo/blob/master/TypeScript/db/index.ts),
  which you can also change to fit your test environment.
* Install Node.js dependencies by running `npm install` from the project's root folder
* Install TypeScript dependencies by running `typings install` from the project's root folder

### Starting

Navigate to the projects's root folder:
```
$ cd TypeScript
```

Compile TypeScript into JavaScript:
```
$ tsc index --target es6 --module commonjs
```

Run the application:
```
$ node index.js
```
