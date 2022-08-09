import database from '../database';
import Orders from '../types/Orders';

class Order {
    async addProduct(
        quantity: number,
        orderId: string,
        productId: string
    ): Promise<Orders> {
        try {
            const connection = await database.connect();
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
            const result = await connection.query(sql, [
                quantity,
                orderId,
                productId,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt create the order. Error ${(err as Error).message}`
            );
        }
    }
    async createOrder(o: Orders): Promise<Orders> {
        try {
            const connection = await database.connect();
            const sql =
                'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            const result = await connection.query(sql, [o.status, o.user_id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt create the order. Error ${(err as Error).message}`
            );
        }
    }

    async getAllOrders(): Promise<Orders[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM orders';
            const result = await connection.query(sql);
            connection.release();
            return result.rows;
        } catch (err) {
            throw new Error(
                `Could'nt get the all orders. Error ${(err as Error).message}`
            );
        }
    }

    async getOrder(id: string): Promise<Orders[]> {
        try {
            const connection = await database.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt get the specific order. Error ${
                    (err as Error).message
                }`
            );
        }
    }

    async updateOrder(id: string, o: Orders): Promise<Orders> {
        try {
            const connection = await database.connect();
            const sql =
                'UPDATE orders SET (status=$2, user_id=$3) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [
                id,
                o.status,
                o.user_id,
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt update the order. Error ${(err as Error).message}`
            );
        }
    }

    async deleteOrder(id: string): Promise<Orders> {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [id]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(
                `Could'nt delete the order. Error ${(err as Error).message}`
            );
        }
    }
}
export default Order;
