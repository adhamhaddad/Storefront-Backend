import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_DEV,
    DB_TEST,
    DB_USER,
    DB_PASSWORD,
    SALT,
    PEPPER,
    TOKEN
} = process.env;

const database = new Pool({
    host: DB_HOST,
    port: Number(DB_PORT),
    database: ENV === 'dev' ? DB_DEV : DB_TEST,
    user: DB_USER
})
export default database;