import express from 'express';
import { authorize, protect } from '../middlewares/auth';
import { addTodo, getTodo } from '../controllers/todo.controller';

const router = express.Router();

router.get('/', protect, getTodo);
router.post('/', protect, authorize([1]), addTodo);

export default router;