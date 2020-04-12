import { Client } from 'pg';

const client = new Client({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_DATABASE || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    port: Number(process.env.DB_PORT) || 6551,
})


export { client };
