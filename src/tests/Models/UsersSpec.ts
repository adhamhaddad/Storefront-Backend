import supertest from 'supertest';
import database from '../../database';
import User from '../../models/Users';
import Users from '../../types/Users';

const user = new User();

describe('User Model methods', () => {
    it ('createUser method should be exist', () => expect(user.createUser).toBeDefined())
    it ('getUser method should be exist', () => expect(user.getUser).toBeDefined())
    it ('updateUser method should be exist', () => expect(user.updateUser).toBeDefined())
    it ('deleteUser method should be exist', () => expect(user.deleteUser).toBeDefined())
});

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
        await user.createUser(newUser);
        expect(newUser).toEqual({
            id: newUser.id,
            username: 'atMrym',
            firstName: 'Mariam',
            lastName: 'Maged',
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
