import { Router } from 'express';
import * as UserController from '../controllers/userController';

const router = Router();

router.post('/signup', UserController.signUp);

router.post('/login', UserController.login);


export default router;
