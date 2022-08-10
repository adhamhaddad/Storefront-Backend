import database from '../database';
import Users from '../types/Users';
import bcrypt from 'bcrypt';

const hash = (pass: string) =>
    bcrypt.hashSync(pass + process.env.PEPPER, Number(process.env.SALT));
class User {
    async createUser(u: Users): Promise<Users> {
        try {
            const connection = await database.connect();
            const sql =
                'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, username';
            const result = await connection.query(sql, [
                u.firstname,
                u.lastname,
                u.username,
                hash(u.password)
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
            const sql = 'SELECT id, firstname, lastname, username FROM users';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could'nt get the all users. Error ${(err as Error).message}`
            );
        }
    }

    async getUser(id: string): Promise<Users> {
        try {
            const connection = await database.connect();
            const sql =
                'SELECT id, firstname, lastname, username FROM users WHERE id=($1)';
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
        try {
            const connection = await database.connect();
            const sql = 'UPDATE users SET firstname=$2, lastname=$3, username=$4, password=$5 WHERE id=($1) RETURNING id, firstname, lastname, username';
            const result = await connection.query(sql, [
                id,
                u.firstname,
                u.lastname,
                u.username,
                hash(u.password)
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
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING id, username';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt delete the user. Error ${(err as Error).message}`
            );
        }
    }

    async authenticate(
        username: string,
        password: string
    ): Promise<Users | null> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT password FROM users WHERE username=($1)';
            const result = await connection.query(sql, [username]);

            if (result.rows.length) {
                const db_password = result.rows[0].password;
                const checkPass = bcrypt.compareSync(
                    password + process.env.PEPPER,
                    db_password
                );

                if (checkPass) {
                    const sql =
                        'SELECT id, firstname, lastName, username FROM users WHERE username=($1)';
                    const result = await connection.query(sql, [username]);
                    connection.release();
                    return result.rows[0];
                }
            }
            connection.release();
            return null;
        } catch (err) {
            throw new Error(
                `Could'nt authenticate the user. Error ${
                    (err as Error).message
                }`
            );
        }
    }
}
export default User;
