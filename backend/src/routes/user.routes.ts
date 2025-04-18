import express from 'express';
import { getUser, updatePassword, updateUserProfile } from '../controllers/user.controller';
import { protect } from '../middlewares/auth';


const router = express.Router();

router.put('/:id', protect, updateUserProfile);
router.get('/', protect, getUser);
router.post('/password', protect, updatePassword);

export default router;
