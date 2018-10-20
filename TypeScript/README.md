## TypeScript 2.x/3.x implementation of pg-promise-demo

### Prerequisites

* Node.js version 4.5 or later
* TypeScript 2.x/3.x, which you can install globally, via command `npm install typescript -g`
* [Typings], which you can install globally, via command `npm install typings -g`

### Installation

* Set up an empty test database, according to the connection details in [TypeScript/db/index.ts](https://github.com/vitaly-t/pg-promise-demo/blob/master/TypeScript/db/index.ts#L32),
  which you can also change to fit your test environment.
* Install Node.js dependencies, by running `npm install` from the project's root folder.
* Install TypeScript dependencies, by running `typings install` from the project's root folder.

### Starting

* Navigating to the projects's root folder:

```
$ cd TypeScript
```

* Compiling the application manually:

```
$ tsc index.ts --target es6 --module commonjs
```

* Running the application:

```
$ node index.js
```

[Typings]:https://github.com/typings/typings

