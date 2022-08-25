import { Request, Response, Application } from 'express';
import User from '../models/Users';
import logger from '../middlewares/logger';
import verifyToken from '../middlewares/token';
import jwt from 'jsonwebtoken';

const user = new User();

const createUser = async (req: Request, res: Response) => {
    try {
        const response = await user.createUser(req.body);
        const token = jwt.sign(response, process.env.TOKEN as string);
        res.status(201).json({
            status: true,
            data: { ...response, token },
            message: 'User created successfully!'
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message,
        });
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const response = await user.getUser(req.params.id);
        res.status(200).json({
            status: true,
            data: { ...response },
            message: 'User received successfully!'
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message,
        });
    }
};

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const response = await user.getAllUsers();
        res.status(200).json({
            status: true,
            data: response,
            message: 'Users received successfully!'
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message,
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const response = await user.updateUser(req.params.id, req.body);
        res.status(201).json({
            status: true,
            data: { ...response },
            message: 'User updated successfully!'
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message,
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const response = await user.deleteUser(req.params.id);
        res.status(200).json({
            status: true,
            data: { ...response },
            message: 'User deleted successfully!'
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message,
        });
    }
};

const authenticate = async (req: Request, res: Response) => {
    try {
        const response = await user.authenticate(
            req.body.username,
            req.body.password
        );
        const token = jwt.sign({ response }, process.env.TOKEN as string);

        if (!response) {
            return res.status(401).json({
                status: false,
                message: "Username and password does'nt match"
            });
        }

        return res.status(200).json({
            status: true,
            data: { ...response, token },
            message: 'User authenticated successfully!'
        });
    } catch (err) {
        res.status(400).json({
            status: false,
            message: (err as Error).message,
        });
    }
};

const user_handler_routes = (app: Application) => {
    app.post('/users', logger, createUser);
    app.get('/users', logger, verifyToken, getAllUsers);
    app.get('/users/:id', logger, verifyToken, getUser);
    app.patch('/users/:id', logger, verifyToken, updateUser);
    app.delete('/users/:id', logger, verifyToken, deleteUser);
    app.post('/users/authenticate', logger, authenticate);
};
export default user_handler_routes;
