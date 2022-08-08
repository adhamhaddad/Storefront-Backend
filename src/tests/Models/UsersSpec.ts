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

describe('Test on the Authenication Logic', () => {
    const newUser: Users = {
        firstName: 'Adham',
        lastName: 'Ashraf',
        username: "adhamhaddad",
        password: 'adham123'
    }
    beforeAll(async () => {
        try {
            const result = await user.createUser(newUser)
            newUser.id = result.id;
            // expect(result).toBe(true);
        } catch (err) {
            throw new Error(`Could'nt create user. Error ${(err as Error).message}`);
        }
    })
    afterAll(async () => {
        try {
            const connection = await database.connect();
            const sql = 'DELETE FROM users';
            connection.release();
        } catch (err) {
            throw new Error(`Could'nt create user. Error ${(err as Error).message}`);
        }
    });
    // it('Authenicate method should return the Authenicated user', async () => {
    //     const authenicateUser = await user
    // })
})