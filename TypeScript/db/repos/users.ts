import {IDatabase, IMain} from 'pg-promise';
import {IResult} from 'pg-promise/typescript/pg-subset';
import {IUser} from '../models';
import {users as sql} from '../sql';

/*
 This repository mixes hard-coded and dynamic SQL, just to show how to use both.
*/

export class UsersRepository {

    /**
     * @param db
     * Automated database connection context/interface.
     *
     * If you ever need to access other repositories from this one,
     * you will have to replace type 'IDatabase<any>' with 'any'.
     *
     * @param pgp
     * Library's root, if ever needed, like to access 'helpers'
     * or other namespaces available from the root.
     */
    constructor(private db: IDatabase<any>, private pgp: IMain) {
        /*
          If your repository needs to use helpers like ColumnSet,
          you should create it conditionally, inside the constructor,
          i.e. only once, as a singleton.
        */
    }

    // Creates the table;
    create(): Promise<null> {
        return this.db.none(sql.create);
    }

    // Initializes the table with some user records, and return their id-s;
    init(): Promise<number[]> {
        return this.db.map(sql.init, [], (row: { id: number }) => row.id);
    }

    // Drops the table;
    drop(): Promise<null> {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    empty(): Promise<null> {
        return this.db.none(sql.empty);
    }

    // Adds a new user, and returns the new object;
    add(name: string): Promise<IUser> {
        return this.db.one(sql.add, name);
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(id: number): Promise<number> {
        return this.db.result('DELETE FROM users WHERE id = $1', +id, (r: IResult) => r.rowCount);
    }

    // Tries to find a user from id;
    findById(id: number): Promise<IUser | null> {
        return this.db.oneOrNone('SELECT * FROM users WHERE id = $1', +id);
    }

    // Tries to find a user from name;
    findByName(name: string): Promise<IUser | null> {
        return this.db.oneOrNone('SELECT * FROM users WHERE name = $1', name);
    }

    // Returns all user records;
    all(): Promise<IUser[]> {
        return this.db.any('SELECT * FROM users');
    }

    // Returns the total number of users;
    total(): Promise<number> {
        return this.db.one('SELECT count(*) FROM users', [], (a: { count: string }) => +a.count);
    }
}
