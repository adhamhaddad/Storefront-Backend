import supertest from 'supertest';
import database from '../../database';
import User from '../../models/Users';
import Users from '../../types/Users';
import app from '../../index';

const user = new User();
const request = supertest(app);

describe('App Tests', () => {
    it('app request should return / endpoint 200 ok', async () => {
        try {
            const response = await request.get('/')
            expect(response.status).toBe(200)
        } catch (err) {
            throw new Error(`Error. ${(err as Error).message}`);
        }
    })
    
})
describe('Test Models APIs Request', () => {
    const newUser: Users = {
        firstName: 'Adham',
        lastName: 'Ashraf',
        username: "adhamhaddad",
        password: 'adham123'
    }
    beforeAll(async () => {
        const response = await request.post('/users');
    })
    it('app request post /users endpoint should return all users 200 ok', async () => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
    })
    it('app request get /users endpoint should return all users 200 ok', async () => {
        const response = await request.get('/users')
        expect(response).toBe()
    })
})
describe('User Model methods', () => {
    it ('createUser method should be exist', () => expect(user.createUser).toBeDefined())
    it ('getUser method should be exist', () => expect(user.getUser).toBeDefined())
    it ('updateUser method should be exist', () => expect(user.updateUser).toBeDefined())
    it ('deleteUser method should be exist', () => expect(user.deleteUser).toBeDefined())
});
/*
describe('Authenication function', () => {
    const newUser: Users = {
        firstName: 'Adham',
        lastName: 'Ashraf',
        username: "adhamhaddad",
        password: 'adham123'
    }
    beforeAll(async () => {
        await user.createUser(newUser)
    })
    afterAll(async () => {
        const connection = await database.connect();
        await connection.query('DELETE FROM users\nALTER SEQUENCE id RESTART WITH 1');
        connection.release();
    });

    it('Create method should return a new user', async () => {
        const newUser: Users = {
            firstName: 'Mariam',
            lastName: 'Maged',
            username: "atMrym",
            password: 'mrym123'
        }
        const result = await user.createUser(newUser);
        expect(result).toEqual({
            id: newUser.id,
            ...newUser,
            password: newUser.password
        })
    })

    it('getAllUsers method should return all users', async () => {
        const users = await user.getAllUsers();
        expect(users.length).toBe(2);
    })
    it('getUser method should return newUser', async () => {
        const retunedUser = await user.getUser(newUser.id as string);
        console.log(retunedUser)
        expect(retunedUser).toBe([]);
    })

    // it('Authenicate method should return the Authenicated user', async () => {
    //     const authenicateUser = await user.authenticate(newUser.username, newUser.password);
    //     expect(authenicateUser?.username).toBe(newUser.username);
    //     expect(authenicateUser?.password).toBe(newUser.password);
    // })
    // it('Authenicate method should return null if the Authenicated user wrong', async () => {
    //     const authenicateUser = await user.authenticate('adhamhadda', 'adham12');
    //     expect(authenicateUser).toBe(null);
    // })
})
*/
