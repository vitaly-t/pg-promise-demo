'use strict';

var sql = require('../sql').products;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class Repository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
    }

    // Creates the table;
    create() {
        return this.db.none(sql.create);
    }

    // Drops the table;
    drop() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    empty() {
        return this.db.none(sql.empty);
    }

    // Adds a new record and returns the new id;
    // It is also an example of mapping HTTP requests directly into query parameters;
    add(values) {
        return this.db.one(sql.add, values, user => user.id);
    }

    // Tries to delete a product by id, and returns the number of records deleted;
    remove(id) {
        return this.db.result('DELETE FROM Products WHERE id = $1', id, r => r.rowCount);
    }

    // Tries to find a product from id;
    find(id) {
        return this.db.oneOrNone('SELECT * FROM Products WHERE id = $1', id);
    }

    // Returns all product records;
    all() {
        return this.db.any('SELECT * FROM Products');
    }

    // Returns the total number of products;
    total() {
        return this.db.one('SELECT count(*) FROM Products', [], a => +a.count);
    }
}

module.exports = Repository;
