import { Router } from 'express';
import {
  getAllUsers, getCurrentUser,
  getUserById,
  updateUserAvatar,
  updateUserInfo,
} from 'controllers/users';
import { validateUserId, validateAvatarUpdate, validateProfileUpdate } from 'middlewares';

const router = Router();

router.get('/', getAllUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateProfileUpdate, updateUserInfo);
router.patch('/me/avatar', validateAvatarUpdate, updateUserAvatar);

export default router;
