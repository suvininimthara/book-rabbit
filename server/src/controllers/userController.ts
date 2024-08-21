import { Request, RequestHandler, Response } from 'express';
import User from '../models/user';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(userId)) {
            throw createHttpError(400, 'Invalid user ID');
        }
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            throw createHttpError(404, 'User not found');
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (user) {
            res.json(user);
        } else {
            throw createHttpError(404, 'User not found');
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.json({ message: 'User deleted' });
        } else {
            throw createHttpError(404, 'User not found');
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
