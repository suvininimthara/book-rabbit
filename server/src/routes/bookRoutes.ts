/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import Book from '../models/book';

const router = Router();

// Create a new book
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (error : any) {
        res.status(400).json({ message: error.message });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
});

// Get a book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error : any) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (book) {
            res.json({ message: 'Book deleted' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error : any) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
