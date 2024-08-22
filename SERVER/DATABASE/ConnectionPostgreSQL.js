import pg from 'pg';
const { host, port, database, user, password } = process.env;

export const pool = new pg.Pool({
    host,
    port,
    database,
    user,
    password
});
