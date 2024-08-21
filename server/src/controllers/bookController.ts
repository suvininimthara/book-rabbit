import { Request, Response } from 'express';
import Book from '../models/book';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const createBook = async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookById = async (req: Request, res: Response) => {
    const bookId = req.params.id;
    try {
        if (!mongoose.isValidObjectId(bookId)) {
            throw createHttpError(400, 'Invalid book ID');
        }
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            throw createHttpError(404, 'Book not found');
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
