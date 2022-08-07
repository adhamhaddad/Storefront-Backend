import database from "../database";
import Users from "../types/Users";
import bcrypt from 'bcrypt';

class User {
    async createUser(u: Users): Promise<Users> {
        const hash = bcrypt.hashSync(u.password+(process.env.PEPPER), Number(process.env.SALT_ROUNDS));
        try {
            const connection = await database.connect();
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                u.firstName,
                u.lastName,
                hash
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could'nt create the users. Error ${(err as Error).message}`);
        }
    }

    async getAllUsers(): Promise<Users[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could'nt get the all users. Error ${(err as Error).message}`);
        }
    }

    async getUser(id: string): Promise<Users[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could'nt get the specific users. Error ${(err as Error).message}`);
        }
    }


    async updateUser(id: string, u: Users): Promise<Users> {
        const hash = bcrypt.hashSync(u.password+(process.env.PEPPER), Number(process.env.SALT_ROUNDS));
        try {
            const connection = await database.connect();
            const sql = 'UPDATE users SET (firstName=$2, lastName=$3, password=$4) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [
                id,
                u.firstName,
                u.lastName,
                hash,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could'nt update the user. Error ${(err as Error).message}`);
        }
    }

    async deleteUser(id: string): Promise<Users> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could'nt delete the user. Error ${(err as Error).message}`);
        }
    }
}
export default User;