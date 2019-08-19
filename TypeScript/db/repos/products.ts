import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {Product} from '../models';
import {products as sql} from '../sql';

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class ProductsRepository {

    constructor(db: any, pgp: IMain) {
        this.db = db;
        this.pgp = pgp; // library's root, if ever needed;

        // set-up all ColumnSet objects, if needed:
        this.createColumnSets();
    }

    // if you need to access other repositories from here,
    // you will have to replace 'IDatabase<any>' with 'any':
    private db: IDatabase<any>;

    private pgp: IMain;

    // ColumnSet objects static namespace:
    private static cs: ProductColumnSets;

    // Creates the table;
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Drops the table;
    async drop(): Promise<null> {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    async empty(): Promise<null> {
        return this.db.none(sql.empty);
    }

    // Adds a new record and returns the full object;
    // It is also an example of mapping HTTP requests into query parameters;
    async add(values: { userId: number, name: string }): Promise<Product> {
        return this.db.one(sql.add, {
            userId: +values.userId,
            productName: values.name
        });
    }

    // Tries to delete a product by id, and returns the number of records deleted;
    async remove(id: number): Promise<number> {
        return this.db.result('DELETE FROM products WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user product from user id + product name;
    async find(values: { userId: number, name: string }): Promise<Product | null> {
        return this.db.oneOrNone(sql.find, {
            userId: +values.userId,
            productName: values.name
        });
    }

    // Returns all product records;
    async all(): Promise<Product[]> {
        return this.db.any('SELECT * FROM products');
    }

    // Returns the total number of products;
    async total(): Promise<number> {
        return this.db.one('SELECT count(*) FROM products', [], (data: { count: string }) => +data.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnSets(): void {
        // create all ColumnSet objects only once:
        if (!ProductsRepository.cs) {
            const helpers = this.pgp.helpers, cs: ProductColumnSets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'products', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id', '?user_id']);

            ProductsRepository.cs = cs;
        }
    }
}

type ProductColumnSets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
