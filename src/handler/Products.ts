import { Request, Response, Application } from 'express';
import Product from '../models/Products';
import logger from '../middlewares/logger';
import verifyToken from '../middlewares/token';

const product = new Product();

const createProduct = async (req: Request, res: Response) => {
    try {
        const response = await product.createProduct(req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Product created successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const getProduct = async (req: Request, res: Response) => {
    try {
        const response = await product.getProduct(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Product received successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const response = await product.getAllProducts();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Products received successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const response = await product.updateProduct(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Product updated successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const response = await product.deleteProduct(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Product deleted successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const product_handler_routes = (app: Application) => {
    app.post('/products', logger, verifyToken, createProduct);
    app.get('/products', logger, getAllProducts);
    app.get('/products/:id', logger, getProduct);
    app.patch('/products/:id', logger, verifyToken, updateProduct);
    app.delete('/products/:id', logger, verifyToken, deleteProduct);
};
export default product_handler_routes;
