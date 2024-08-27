import { Request, Response, NextFunction, RequestHandler } from 'express';
import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface CustomRequest extends Request {
    user?: User;
}

export const requiresAuth: RequestHandler = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        next(createHttpError(401, "User not authenticated"));
    }
};

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = verified as User;
        next();
    } catch (error) {
        console.error('Token verification failed:', error); // Example logging
        return next(createHttpError(400, 'Invalid Token'));
    }

};