import database from "../database";
import Orders from "../types/Orders";

class Order {
    async createOrder(o: Orders): Promise<Orders> {
        try {
            const connection = await database.connect();
            const sql = 'INSERT INTO orders (product_id, quantity, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *';
            const result = await connection.query(sql, [
                o.product_id,
                o.quantity,
                o.user_id,
                o.status
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could'nt create the order. Error ${(err as Error).message}`);
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
            throw new Error(`Could'nt get the all orders. Error ${(err as Error).message}`);
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
            throw new Error(`Could'nt get the specific order. Error ${(err as Error).message}`);
        }
    }


    async updateOrder(id: string, o: Orders): Promise<Orders> {
        try {
            const connection = await database.connect();
            const sql = 'UPDATE orders SET (product_id=$2, quantity=$3, user_id=$4, status=$5) WHERE id=($1) RETURNING *';
            const result = await connection.query(sql, [
                id,
                o.product_id,
                o.quantity,
                o.user_id,
                o.status
            ]);
            connection.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could'nt update the order. Error ${(err as Error).message}`);
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
            throw new Error(`Could'nt delete the order. Error ${(err as Error).message}`);
        }
    }
}
export default Order;