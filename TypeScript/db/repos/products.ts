import {IDatabase, IMain} from 'pg-promise';
import sqlProvider = require('../sql');

var sql = sqlProvider.products;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class ProductsRepository {

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

    // Drops the table;
    drop() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    empty() {
        return this.db.none(sql.empty);
    }

    // Adds a new record and returns the full object;
    // It is also an example of mapping HTTP requests into query parameters;
    add(values: any) {
        return this.db.one(sql.add, {
            userId: +values.userId,
            productName: values.name
        });
    }

    // Tries to delete a product by id, and returns the number of records deleted;
    remove(id: number) {
        return this.db.result('DELETE FROM products WHERE id = $1', +id, (r: any) => r.rowCount);
    }

    // Tries to find a user product from user id + product name;
    find(values) {
        return this.db.oneOrNone(sql.find, {
            userId: +values.userId,
            productName: values.name
        });
    }

    // Returns all product records;
    all() {
        return this.db.any('SELECT * FROM products');
    }

    // Returns the total number of products;
    total() {
        return this.db.one('SELECT count(*) FROM products', [], (data: any) => +data.count);
    }
}
