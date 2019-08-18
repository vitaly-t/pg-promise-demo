import {IDatabase, IMain, ColumnSet} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {User} from '../models';
import {users as sql} from '../sql';

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

export class UsersRepository {

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
    private static cs: UserColumnSets;

    // Creates the table;
    async create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Initializes the table with some user records, and return their id-s;
    async init(): Promise<number[]> {
        return this.db.map(sql.init, [], (row: { id: number }) => row.id);
    }

    // Drops the table;
    async drop(): Promise<null> {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    async empty(): Promise<null> {
        return this.db.none(sql.empty);
    }

    // Adds a new user, and returns the new object;
    async add(name: string): Promise<User> {
        return this.db.one(sql.add, name);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    async remove(id: number): Promise<number> {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user from id;
    async findById(id: number): Promise<User | null> {
        return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
    }

    // Tries to find a user from name;
    async findByName(name: string): Promise<User | null> {
        return this.db.oneOrNone('SELECT * FROM users WHERE name = $1', name);
    }

    // Returns all user records;
    async all(): Promise<User[]> {
        return this.db.any('SELECT * FROM users');
    }

    // Returns the total number of users;
    async total(): Promise<number> {
        return this.db.one('SELECT count(*) FROM users', [], (a: { count: string }) => +a.count);
    }

    // example of setting up ColumnSet objects:
    private createColumnSets(): void {
        // create all ColumnSet objects only once:
        if (!UsersRepository.cs) {
            const helpers = this.pgp.helpers, cs: UserColumnSets = {};

            // Type TableName is useful when schema isn't default "public" ,
            // otherwise you can just pass in a string for the table name.
            const table = new helpers.TableName({table: 'user', schema: 'public'});

            cs.insert = new helpers.ColumnSet(['name'], {table});
            cs.update = cs.insert.extend(['?id']);

            UsersRepository.cs = cs;
        }
    }

}

type UserColumnSets = {
    insert?: ColumnSet,
    update?: ColumnSet
};
