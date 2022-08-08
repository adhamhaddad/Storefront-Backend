import database from '../../database';
import Product from '../../models/Products';
import Products from '../../types/Products';

const user = new Product();

describe('User Model methods', () => {
    it ('createUser method should be exist', () => expect(user.createProduct).toBeDefined())
    it ('getUser method should be exist', () => expect(user.getProduct).toBeDefined())
    it ('updateUser method should be exist', () => expect(user.updateProduct).toBeDefined())
    it ('deleteUser method should be exist', () => expect(user.deleteProduct).toBeDefined())
});