import database from '../database';
import Users from '../types/Users';
import bcrypt from 'bcrypt';

class User {
    async createUser(u: Users): Promise<Users> {
        const hash = bcrypt.hashSync(
            u.password + process.env.PEPPER,
            Number(process.env.SALT)
        );
        try {
            const connection = await database.connect();
            const sql =
                'INSERT INTO users (firstName, lastName, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await connection.query(sql, [
                u.firstName,
                u.lastName,
                u.username,
                hash,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt create the users. Error ${(err as Error).message}`
            );
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
            throw new Error(
                `Could'nt get the all users. Error ${(err as Error).message}`
            );
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
            throw new Error(
                `Could'nt get the specific users. Error ${
                    (err as Error).message
                }`
            );
        }
    }

    async updateUser(id: string, u: Users): Promise<Users> {
        const hash = bcrypt.hashSync(
            u.password + process.env.PEPPER,
            Number(process.env.SALT)
        );
        try {
            const connection = await database.connect();
            const sql =
                'UPDATE users SET (firstName=$2, lastName=$3, username=$4, password=$5) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [
                id,
                u.firstName,
                u.lastName,
                u.username,
                hash,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt update the user. Error ${(err as Error).message}`
            );
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
            throw new Error(
                `Could'nt delete the user. Error ${(err as Error).message}`
            );
        }
    }

    async authenticate(username: string, password: string): Promise<Users | null> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = await connection.query(sql, [username]);

            if (result.rows.length) {
                const pass = result.rows[0].password;
                const isPasswordValid = bcrypt.compareSync(password+process.env.PEPPER, pass);
                if (isPasswordValid) {
                    const info = 'SELECT id, firstName, lastName, username FROM users WHERE username=($1)';
                    const userInfo = await connection.query(info, [username]);
                    return userInfo.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (err) {
            throw new Error(
                `Could'nt authenticate the user. Error ${(err as Error).message}`
            );
        }
    }
}
export default User;
