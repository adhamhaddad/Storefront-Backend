import dotenv from "dotenv";
import {Pool} from "pg";

dotenv.config();

const {
    ENV,
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;


const client = new Pool ({
    database: ENV === "dev" ? POSTGRES_DB : POSTGRES_DB_TEST,
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default client;