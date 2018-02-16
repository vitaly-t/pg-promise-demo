import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import sqlProvider = require('../sql');

const sql = sqlProvider.products;

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class ProductsRepository {

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;

        // set-up all ColumnSet objects, if needed:
        this.createColumnsets();
    }

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private db: IDatabase<any>;

    private pgp: IMain;

    // ColumnSet objects static namespace:
    private static cs: ProductColumnsets;

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
        return this.db.result('DELETE FROM products WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user product from user id + product name;
    find(values: any) {
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
        return this.db.one('SELECT count(*) FROM products', [], (data: { count }) => +data.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnsets() {
        // create all ColumnSet objects only once:
        if (!ProductsRepository.cs) {
            const helpers = this.pgp.helpers, cs: ProductColumnsets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'products', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id', '?user_id']);

            ProductsRepository.cs = cs;
        }
    }
}

type ProductColumnsets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
