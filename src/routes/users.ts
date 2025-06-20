import { Router } from 'express';
import {
  createUser, getAllUsers, getUserById, updateUserAvatar, updateUserInfo,
} from 'controllers/users';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId', getUserById);
router.patch('/me', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

export default router;
