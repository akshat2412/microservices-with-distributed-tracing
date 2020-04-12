import * as mysql from 'mysql2/promise';
import { client } from './connection';
import { Query } from "mysql2/promise";
import { Client, QueryResult } from 'pg';

export class UserDbContext {
    private _connection: Client;

    constructor() {
        this._connection = client;
        this._connection.connect();
    }

    // Returns the user information object based on passed parameter.
    public GetUser = async (username: string) => {
        const QUERY = `SELECT *
                       FROM USERS
                       WHERE Username = '${username}'`;
        const res: QueryResult = await this._connection.query(QUERY)
        return res.rows[0];
    }
}