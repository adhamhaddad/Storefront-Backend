import supertest from "supertest";
import app from "../../index";
import database from '../../database';
import User from "../../models/Users";
import Product from "../../models/Products";
import Order from "../../models/Orders";
import Orders from "../../types/Orders";

const user = new User();
const product = new Product();
const order = new Order();
const request = supertest(app);
let token = '';

describe('Product Handler APIs', () => {
    const newOrder = {
        status: 'complete'
    } as Orders;

    describe('Test on token validation', () => {
        beforeAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.query('DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1');
            await connection.query('DELETE FROM orders;\nALTER SEQUENCE orders_id_seq RESTART WITH 1');
            connection.release();
            await order.createOrder(newOrder)
        });
        afterAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1');
            connection.release();
        })
        describe('Authentication process', () => {
            it('Expect to authenticate successfully', async () => {
                const response = await request.post('/users/authenticate').set('Content-type', 'application/json').send({
                    username: 'adhamhaddad',
                    password: 'adham123'
                });
                expect(response.status).toBe(200);
                token = response.body.data.token
            })
            it('Expect to failed in authentication process', async () => {
                const response = await request.post('/users/authenticate').set('Content-type', 'application/json').send({
                    username: 'adhamhaddad',
                    password: 'wrong-password'
                });
                expect(response.status).toBe(401);
            })
        })
    })

    describe('Test all CRUD operation APIs', () => {
        
        it('Expect createOrder /orders endpoint to be 201 ok', async () => {
            const response = await request.post('/orders').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send({
                name: 'Labtop',
                price: 12000
            });
            expect(response.status).toBe(201);
        })
        
        it('Expect getAllOrders /orders endpoint to be 200 ok', async () => {
            const response = await request.get('/orders');
            expect(response.status).toBe(200);
        })

        it('Expect getOrder /orders endpoint to be 200 ok', async () => {
            const response = await request.get('/orders/1');
            expect(response.status).toBe(200);
        })
        
        it('Expect updateOrder /orders endpoint to be 201', async () => {
            const response = await request.patch('/orders/1').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send({
                name: 'Mobile',
                price: 5000
            });
            expect(response.status).toBe(201);
        })
        
        it('Expect deleteOrder /orders endpoint to be 200 ok', async () => {
            const response = await request.delete('/orders/1').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`)
            expect(response.status).toBe(200);
        })
    })
})
