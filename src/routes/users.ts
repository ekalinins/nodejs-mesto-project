import { Router } from 'express';
import {
  getAllUsers, getCurrentUser,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
} from 'controllers/users';

const router = Router();

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

export default router;
