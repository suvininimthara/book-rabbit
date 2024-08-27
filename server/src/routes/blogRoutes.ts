import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, getRecentBlogs } from '../controllers/blogControllers';

const router = express.Router();

router.post('/', createBlog);          
router.get('/', getAllBlogs);         
router.get('/:id', getBlogById);       
router.put('/:id', updateBlog);        
router.delete('/:id', deleteBlog);     
router.get('/recent', getRecentBlogs); 

export default router;
