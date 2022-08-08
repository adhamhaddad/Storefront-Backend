import database from '../database';
import Products from '../types/Products';

class Product {
    async createProduct(p: Products): Promise<Products> {
        try {
            const connection = await database.connect();
            const sql =
                'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const result = await connection.query(sql, [p.name, p.price]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt create the product. Error ${(err as Error).message}`
            );
        }
    }

    async getAllProducts(): Promise<Products[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM products';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could'nt get the all products. Error ${(err as Error).message}`
            );
        }
    }

    async getProduct(id: string): Promise<Products[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt get the specific product. Error ${
                    (err as Error).message
                }`
            );
        }
    }

    async updateProduct(id: string, p: Products): Promise<Products> {
        try {
            const connection = await database.connect();
            const sql =
                'UPDATE products SET (name=$2, price=$3) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id, p.name, p.price]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt update the product. Error ${(err as Error).message}`
            );
        }
    }

    async deleteProduct(id: string): Promise<Products> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt delete the product. Error ${(err as Error).message}`
            );
        }
    }
}
export default Product;
