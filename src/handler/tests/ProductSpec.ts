import supertest from "supertest";
import app from "../../index";
import database from '../../database';
import User from "../../models/Users";
import Product from "../../models/Products";

const user = new User();
const product = new Product();
const request = supertest(app);
let token = '';

describe('Product Handler APIs', () => {
    const newUser = {
        firstname: 'Adham',
        lastname: 'Ashraf',
        username: 'adhamhaddad',
        password: 'adham123'
    };

    const newProduct = {
        name: 'Mobile',
        price: 12000
    }

    describe('Test on token validation', () => {
        beforeAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1');
            await connection.query('DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1');
            connection.release();
            await user.createUser(newUser)
            await product.createProduct(newProduct)
        });
        afterAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;\nDELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1');
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
        
        it('Expect createProduct /products endpoint to be 201 ok', async () => {
            const response = await request.post('/products').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send({
                name: 'Labtop',
                price: 12000
            });
            expect(response.status).toBe(201);
        })
        
        it('Expect getAllProduct /products endpoint to be 200 ok', async () => {
            const response = await request.get('/products');
            expect(response.status).toBe(200);
        })

        it('Expect getProduct /products endpoint to be 200 ok', async () => {
            const response = await request.get('/products/1');
            expect(response.status).toBe(200);
        })
        
        it('Expect updateProduct /products endpoint to be 201', async () => {
            const response = await request.patch('/products/1').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send({
                name: 'Mobile',
                price: 5000
            });
            expect(response.status).toBe(201);
        })
        
        it('Expect deleteProduct /products endpoint to be 200 ok', async () => {
            const response = await request.delete('/products/1').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        })
        
    })
})