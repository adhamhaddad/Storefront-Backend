import User from '../../models/Users';
import database from '../../database';
import Users from '../../types/Users';

const user = new User();

describe('Authentication Module', () => {
    describe('Test methods exists', () => {
        it('should have an authenticate user method', () => {
            expect(user.authenticate).toBeDefined();
        })
    });

    describe('Test Authenticateion Logic', () => {
        const newUser = {
            firstname: 'Adham',
            lastname: 'Ashraf',
            username: "adhamhaddad",
            password: 'adham123'
        } as Users
        beforeAll(async () => {
            await user.createUser(newUser);
        });
        afterAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1');
            connection.release();
        });

        it('Authenticate method should return the authenticated user', async () => {
            const authenticatedUser = await user.authenticate(newUser.username, newUser.password);
            expect(authenticatedUser?.username).toBe(newUser.username);
            expect(authenticatedUser?.firstname).toBe(newUser.firstname);
            expect(authenticatedUser?.lastname).toBe(newUser.lastname);
        })
        it('Authenticate method should resturn null if the authentication failed', async () => {
            const authenticatedUser = await user.authenticate('adham', 'password');
            expect(authenticatedUser).toBe(null);
        })

    })
})
