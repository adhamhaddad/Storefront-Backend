import { Request, Response, Application } from 'express';
import Order from "../models/Orders";
import logger from '../middlewares/logger';

const order = new Order();

const createOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.createOrder(req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Order created successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const getOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.getOrder(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Order received successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const response = await order.getAllOrders();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Orders received successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const updateOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.updateOrder(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'Order updated successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const response = await order.deleteOrder(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'Order deleted successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const Order_handler_routes = (app: Application) => {
    app.post('/orders', logger, createOrder)
    app.get('/orders', logger, getAllOrders)
    app.get('/orders/:id', logger, getOrder)
    app.patch('/orders/:id', logger, updateOrder)
    app.delete('/orders/:id', logger, deleteOrder)
}
export default Order_handler_routes;