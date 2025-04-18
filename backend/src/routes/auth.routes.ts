import express from 'express';
import { signin, signout, signup } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', signup);
router.post('/login', signin);
router.post('/signout', signout);

export default router;
