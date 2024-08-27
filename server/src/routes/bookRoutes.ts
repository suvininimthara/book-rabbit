import { Router } from 'express';
import { createBook, getAllBooks, getBookById, updateBook, deleteBook, getRecentBooks } from '../controllers/bookController';

const router = Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/recent', getRecentBooks);

export default router;
