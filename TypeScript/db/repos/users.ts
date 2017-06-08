import {IDatabase, IMain} from 'pg-promise';
import sqlProvider = require('../sql');

var sql = sqlProvider.users;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class Repository {

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;
    }

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private db: IDatabase<any>;

    private pgp: IMain;

    // Creates the table;
    create() {
        return this.db.none(sql.create);
    }

    // Initializes the table with some user records, and return their id-s;
    init() {
        return this.db.map(sql.init, [], (row: any) => row.id);
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
    add(name: string) {
        return this.db.one(sql.add, name, (user: any) => user.id);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id: number) {
        return this.db.result('DELETE FROM Users WHERE id = $1', id, (r: any) => r.rowCount);
    }

    // Tries to find a user from id;
    find(id: number) {
        return this.db.oneOrNone('SELECT * FROM Users WHERE id = $1', id);
    }

    // Returns all user records;
    all() {
        return this.db.any('SELECT * FROM Users');
    }

    // Returns the total number of users;
    total() {
        return this.db.one('SELECT count(*) FROM Users', [], (a: any) => +a.count);
    }
}
