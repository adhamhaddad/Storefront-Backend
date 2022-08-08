import { Request, Response, Application } from 'express';
import Order from '../models/Orders';
import logger from '../middlewares/logger';
import verifyToken from '../middlewares/token';

const order = new Order();

const addProduct = async (req: Request, res: Response) => {
    const quantity = Number(req.body.quantity)
    const id = req.params.id;
    const productId = req.body.productId
    try {
        const response = await order.addProduct(quantity, id, productId);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Product added successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.createOrder(req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Order created successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const getOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.getOrder(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Order received successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const response = await order.getAllOrders();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Orders received successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const updateOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.updateOrder(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Order updated successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.deleteOrder(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Order deleted successfully!',
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message
        });
    }
};

const order_handler_routes = (app: Application) => {
    app.post('/orders', logger, verifyToken, createOrder);
    app.get('/orders', logger, getAllOrders);
    app.get('/orders/:id', logger, getOrder);
    app.patch('/orders/:id', logger, verifyToken, updateOrder);
    app.delete('/orders/:id', logger, verifyToken, deleteOrder);
    // add products
    app.post('/orders/:id/products', logger, verifyToken, addProduct);
};
export default order_handler_routes;
