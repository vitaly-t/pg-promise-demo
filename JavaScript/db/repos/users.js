'use strict';

var sql = require('../sql').users;

module.exports = (rep, pgp) => {

    /*
     This repository mixes hard-coded and dynamic SQL,
     primarily to show a diverse example of using both.
     */

    return {

        // Creates the table;
        create: () =>
            rep.none(sql.create),

        // Initializes the table with some user records, and return their id-s;
        //
        // When we execute more than one insert, we should use a transaction, although
        // in this particular example we use a single concatenated insert, so a transaction
        // isn't really needed. It is here just as an example.
        //
        // Also, giving names to your tasks and transactions is a reliable way to track their errors.
        init: () =>
            rep.tx('Demo-Users', t => t.map(sql.init, null, row => row.id)),

        // Drops the table;
        drop: () =>
            rep.none(sql.drop),

        // Removes all records from the table;
        empty: () =>
            rep.none(sql.empty),

        // Adds a new user, and returns the new id;
        add: name =>
            rep.one(sql.add, name, user => user.id),

        // Tries to delete a user by id, and returns the number of records deleted;
        remove: id =>
            rep.result('DELETE FROM Users WHERE id = $1', id, r => r.rowCount),

        // Tries to find a user from id;
        find: id =>
            rep.oneOrNone('SELECT * FROM Users WHERE id = $1', id),

        // Returns all user records;
        all: () =>
            rep.any('SELECT * FROM Users'),

        // Returns the total number of users;
        total: () =>
            rep.one('SELECT count(*) FROM Users', [], a => +a.count)
    };
};
