import { Request, Response, Application } from 'express';
import User from "../models/Users";
import logger from '../middlewares/logger';

const user = new User();

const createUser = async (req: Request, res: Response) => {
    try {
        const response = await user.createUser(req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'User created successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const response = await user.getUser(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'User received successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const response = await user.getAllUsers();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Users received successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const response = await user.updateUser(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: response,
            message: 'User updated successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const response = await user.deleteUser(req.params.id);
        res.status(200).json({
            status: true,
            data: response,
            message: 'User deleted successfully!'
        })
    } catch (err) {
        throw new Error(`Error. ${(err as Error).message}`);
    }
}

const User_handler_routes = (app: Application) => {
    app.post('/users', logger, createUser)
    app.get('/users', logger, getAllUsers)
    app.get('/users/:id', logger, getUser)
    app.patch('/users/:id', logger, updateUser)
    app.delete('/users/:id', logger, deleteUser)
}
export default User_handler_routes;