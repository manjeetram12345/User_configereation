import { Router } from 'express';
import { createUserHandler, getUserHandler, updateUserHandler, listUsersHandler } from './user.controller';

const router = Router();
router.post('/', createUserHandler);
router.get('/', listUsersHandler);
router.get('/:id', getUserHandler);
router.put('/:id', updateUserHandler);

export const userRouter = router;
