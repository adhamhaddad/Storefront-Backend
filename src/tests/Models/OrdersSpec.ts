import database from '../../database';
import Order from '../../models/Orders';
import Orders from '../../types/Orders';

const user = new Order();

describe('User Model methods', () => {
    it ('createUser method should be exist', () => expect(user.createOrder).toBeDefined())
    it ('getUser method should be exist', () => expect(user.getOrder).toBeDefined())
    it ('updateUser method should be exist', () => expect(user.updateOrder).toBeDefined())
    it ('deleteUser method should be exist', () => expect(user.deleteOrder).toBeDefined())
});