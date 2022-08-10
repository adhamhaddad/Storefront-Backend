import User from '../Users';
import Users from '../../types/Users';
import database from '../../database';

const user = new User();

describe('User Model', () => {
    describe('Test methods exists', () => {
        it('expects all CRUD operation methods to be exists', () => {
            expect(user.createUser).toBeDefined();
            expect(user.getAllUsers).toBeDefined();
            expect(user.getUser).toBeDefined();
            expect(user.updateUser).toBeDefined();
            expect(user.deleteUser).toBeDefined();
        })
    });
    describe('Methods returns', () => {
        const newUser1 = {
            firstname: 'Adham',
            lastname: 'Ashraf',
            username: 'adhamhaddad1',
            password: 'adham123'
        } as Users
        const newUser2 = {
            firstname: 'Adham',
            lastname: 'Ashraf',
            username: 'adhamhaddad2',
            password: 'adham123'
        } as Users
        const updated = {
            firstname: 'Adham',
            lastname: 'Ashraf',
            username: 'adhamhaddad3',
            password: 'adham123'
        } as Users
        
        beforeAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1');
            connection.release();
            await user.createUser(newUser1)
        });
        afterAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1');
            connection.release();
        });

        it('createUser method should return a new user', async () => {
            const result = await user.createUser(newUser2)
            expect(result).toEqual({
                id: 2,
                firstname: 'Adham',
                lastname: 'Ashraf',
                username: 'adhamhaddad2'
            } as Users)
        });

        it('getAllUsers method should return array of users', async () => {
            const result = await user.getAllUsers();
            expect(result.length).toEqual(2);
            
            expect(result[0]).toEqual({
                id: 1,
                firstname: 'Adham',
                lastname: 'Ashraf',
                username: 'adhamhaddad1'
            } as Users)
            
            expect(result[1]).toEqual({
                id: 2,
                firstname: 'Adham',
                lastname: 'Ashraf',
                username: 'adhamhaddad2'
            } as Users)
        });
        
        it('getUser method should return one of users by id', async () => {
            const result = await user.getUser('2');
            expect(result).toEqual({
                id: 2,
                firstname: 'Adham',
                lastname: 'Ashraf',
                username: 'adhamhaddad2'
            } as Users)
        })
        
        it('updateUser method should return object with new values', async () => {
            const result = await user.updateUser('2', updated);
            expect(result).toEqual({
                id: 2,
                firstname: 'Adham',
                lastname: 'Ashraf',
                username: 'adhamhaddad3'
            } as Users)
        })
        
        it('deleteUser method should return object', async () => {
            const result = await user.deleteUser('2');
            expect(result).toEqual({
                id: 2,
                username: 'adhamhaddad3'
            } as Users)
        })
    })
})
