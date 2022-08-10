import Product from '../Products';
import Products from '../../types/Products';
import database from '../../database';

const product = new Product();

describe('Product Model', () => {
    describe('Test methods exists', () => {
        it('expects all CRUD operation methods to be exists', () => {
            expect(product.createProduct).toBeDefined();
            expect(product.getAllProducts).toBeDefined();
            expect(product.getProduct).toBeDefined();
            expect(product.updateProduct).toBeDefined();
            expect(product.deleteProduct).toBeDefined();
        })
    });
    describe('Methods returns', () => {
        const newProduct1 = {
            name: 'Labtop',
            price: 12000
        } as Products
        
        const newProduct2 = {
            name: 'Computer',
            price: 22000
        } as Products
        
        const updated = {
            name: 'Mobile',
            price: 6000
        } as Products
        
        beforeAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1');
            connection.release();
            await product.createProduct(newProduct1)
        });
        afterAll(async () => {
            const connection = await database.connect();
            await connection.query('DELETE FROM products;\nALTER SEQUENCE products_id_seq RESTART WITH 1');
            connection.release();
        });

        it('createProduct method should return a new product', async () => {
            const result = await product.createProduct(newProduct2)
            expect(result).toEqual({
                id: 2,
                name: 'Computer',
                price: 22000
            } as Products)
        });

        it('getAllProducts method should return array of products', async () => {
            const result = await product.getAllProducts();
            expect(result.length).toEqual(2);
            
            expect(result[0]).toEqual({
                id: 1,
                name: 'Labtop',
                price: 12000
            } as Products)
            
            expect(result[1]).toEqual({
                id: 2,
                name: 'Computer',
                price: 22000
            } as Products)
        });

        it('getProduct method should return one of products by id', async () => {
            const result = await product.getProduct('2');
            expect(result).toEqual({
                id: 2,
                name: 'Computer',
                price: 22000
            } as Products)
        })
        
        it('updateProduct method should return object with new values', async () => {
            const result = await product.updateProduct('2', updated);
            expect(result).toEqual({
                id: 2,
                name: 'Mobile',
                price: 6000
            } as Products)
        })
        
        it('deleteProduct method should return object with deleted items', async () => {
            const result = await product.deleteProduct('2');
            expect(result).toEqual({
                id: 2,
                name: 'Mobile',
                price: 6000
            } as Products)
        })
    })
})
