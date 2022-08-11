import supertest from "supertest";
import app from "../../index";
import database from '../../database';
import User from "../../models/Users";

const request = supertest(app);
const user = new User();
let token = '';

describe('User Handler APIs', () => {
    const newUser = {
        firstname: 'Adham',
        lastname: 'Ashraf',
        username: 'adhamhaddad',
        password: 'adham123'
    };
    describe('Test on token validation', () => {
        beforeAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1');
            connection.release();
            await user.createUser(newUser)
        });
        afterAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1');
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
        it('Expect createUser /users endpoint to be 201 ok', async () => {
            const response = await request.post('/users').set('Content-type', 'application/json').send({
                firstname: 'Adham',
                lastname: 'Haddad',
                username: 'adhamhaddad2',
                password: 'adham123'
            });
            expect(response.status).toBe(201);
        })
        
        it('Expect getAllUsers /users endpoint to be 200 ok', async () => {
            const response = await request.get('/users').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        })

        it('Expect getUser /users endpoint to be 200 ok', async () => {
            const response = await request.get('/users/2').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        })
        
        it('Expect updateUser /users endpoint to be 201 ok', async () => {
            const response = await request.patch('/users/2').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`).send({
                firstname: 'Adham',
                lastname: 'Haddad',
                username: 'adhamashraf',
                password: 'adham123'
            });
            expect(response.status).toBe(201);
        })
        
        it('Expect deleteUser /users endpoint to be 200 ok', async () => {
            const response = await request.delete('/users/2').set('Content-type', 'application/json').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(200);
        })
        
    })
})
