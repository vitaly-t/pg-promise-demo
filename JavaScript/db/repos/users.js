'use strict';

var sql = require('../sql').users;

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

    // Initializes the table with some user records, and return their id-s;
    init() {
        return this.db.map(sql.init, [], row => row.id);
    }

    // Drops the table;
    drop() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    empty() {
        return this.db.none(sql.empty);
    }

    // Adds a new user, and returns the new id;
    add(name) {
        return this.db.one(sql.add, name, user => user.id);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id) {
        return this.db.result('DELETE FROM Users WHERE id = $1', id, r => r.rowCount);
    }

    // Tries to find a user from id;
    find(id) {
        return this.db.oneOrNone('SELECT * FROM Users WHERE id = $1', id);
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM Users');
    }

    // Returns the total number of users;
    total() {
        return this.db.one('SELECT count(*) FROM Users', [], a => +a.count);
    }
}

module.exports = Repository;
