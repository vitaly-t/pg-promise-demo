### TypeScript implementation of pg-promise-demo

### Prerequisites

* Node.js version 0.10.x or later
* TypeScript, which you can install globally via command `npm install typescript -g`
* Typings, which you can install globally via command `npm install typings -g`

### Installation

* Set up a test database according to the connection details in file [TypeScript/db/index.js](https://github.com/vitaly-t/pg-promise-demo/blob/master/TypeScript/db/index.ts),
  which you can also change to fit your test environment.
* Install Node.js dependencies by running `npm install` from the project's root folder
* Install TypeScript dependencies by running `typings install` from the project's root folder

In order to make your local copy use Bluebird as the promise library:

* Open file `node_modules/pg-promise/typescript/promise.ts`
* Add before the namespace: `/// <reference path='../../../typings/main' />`
* Replace line `export=Promise;` with the following:

```ts
import * as promise from 'bluebird';
export=promise;
```

But if you want to use ES6 Promise instead, then you do not need to change that file, and instead you need: 
* Node.js 4.x or later, to be able to run ES6 JavaScript
* Instead of `tsc index` command use `$ tsc index --target es6 --module commonjs`.
 
### Starting

Navigate to the projects's root folder:
```
$ cd TypeScript
```

Compile TypeScript into JavaScript:
```
$ tsc index
```

Run the application:
```
$ node index.js
```
 
