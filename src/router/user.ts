import { Router } from 'express';
import UserController from '../controller/userController';

const userRouter = Router();

userRouter.get('/register', UserController.register);

export default userRouter;
