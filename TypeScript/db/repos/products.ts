import sqlProvider = require('../sql');

var sql = sqlProvider.products;

/*
 This repository mixes hard-coded and dynamic SQL,
 primarily to show a diverse example of using both.
 */

export class Repository {

    constructor(db:any) {
        this.db = db;
    }

    private db:any;

    // Creates the table;
    create = () =>
        this.db.none(sql.create);

    // Drops the table;
    drop = () =>
        this.db.none(sql.drop);

    // Removes all records from the table;
    empty = () =>
        this.db.none(sql.empty);

    // Adds a new record and returns the new id;
    // It is also an example of mapping HTTP requests directly into query parameters;
    add = (values:any) =>
        this.db.one(sql.add, values, (user:any) => user.id);

    // Tries to delete a product by id, and returns the number of records deleted;
    remove = (id:number) =>
        this.db.result('DELETE FROM Products WHERE id = $1', id, (r:any) => r.rowCount);

    // Tries to find a product from id;
    find = (id:number) =>
        this.db.oneOrNone('SELECT * FROM Products WHERE id = $1', id);

    // Returns all product records;
    all = () =>
        this.db.any('SELECT * FROM Products');

    // Returns the total number of products;
    total = () =>
        this.db.one('SELECT count(*) FROM Products', [], (data:any) => parseInt(data.count));
}
