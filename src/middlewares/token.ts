import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization as string;
        const token = authorization.split(' ')[1];
        const decode = jwt.verify(token, process.env.TOKEN as string);
        if (decode) {
            next();
        }
    } catch (err) {
        res.status(401).json({
            status: false,
            message: `Access denied, invalid token ${(err as Error).message}`,
        });
    }
};
export default verifyToken;
