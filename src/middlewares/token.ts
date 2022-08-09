import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = String(req.headers.authorization);
        const token = authorization.split(' ')[1];
        jwt.verify(token, String(process.env.TOKEN));
        next();
    } catch (err) {
        res.status(401).json({
            status: false,
            message: `Access denied, invalid token ${(err as Error).message}`,
        });
    }
};
export default verifyToken;
