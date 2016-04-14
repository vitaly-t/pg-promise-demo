import sqlProvider = require('../sql');

var sql = sqlProvider.users;

namespace users {

    export interface Repository {
        create():Promise<void>;
        init():Promise<Array<number>>;
        drop():Promise<void>;
        empty():Promise<void>;
        add(values:Object):Promise<number>;
        remove(id:number):Promise<number>;
        find(id:number):Promise<any>;
        all():Promise<Array<any>>
        total():Promise<number>
    }

    export function extend(rep) {
        /*
         This repository mixes hard-coded and dynamic SQL,
         primarily to show a diverse example of using both.
         */

        return {

            // Creates the table;
            create: () => rep.none(sql.create),

            // Initializes the table with some user records, and return their id-s;
            init: () =>
                // When we execute more than one insert, we should use a transaction, although in this
                // particular example we use a single concatenated insert, so transaction isn't needed.
                // It is here just as an example.
                //
                // Also, giving your tasks and transactions names is a reliable way to track their errors.
                rep.tx("Demo-Users", t =>
                    t.any(sql.init)
                        .then(data => data.map(m => m.id))
                ),

            // Drops the table;
            drop: () => rep.none(sql.drop),

            // Removes all records from the table;
            empty: () => rep.none(sql.empty),

            // Adds a new user, and returns the new id;
            add: name => rep.one(sql.add, name)
                .then(user => user.id),

            // Tries to delete a user by id, and returns the number of records deleted;
            remove: id => rep.result("DELETE FROM Users WHERE id = $1", id)
                .then(result => result.rowCount),

            // Tries to find a user from id;
            find: id => rep.oneOrNone("SELECT * FROM Users WHERE id = $1", id),

            // Returns all the records;
            all: () => rep.any("SELECT * FROM Users"),

            // Returns the total number of users;
            total: () => rep.one("SELECT count(*) FROM Users")
                .then(data => parseInt(data.count))

        };
    }
}

export = users;
