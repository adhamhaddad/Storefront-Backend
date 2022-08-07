import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
    ENV,
    PORT,
    HOST,
    DATABASE,
    DATABASE_TEST,
    USER,
    PASSWORD,
    SALT_ROUNDS,
    PEPPER
} = process.env;

const database = new Pool({
    host: HOST,
    database: ENV === 'dev' ? DATABASE : DATABASE_TEST,
    user: USER,
    password: PASSWORD
})
export default database;