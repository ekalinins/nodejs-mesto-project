import { Router } from 'express';
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} from '@/controllers/cards';
import { validateCardId } from '@/middlewares';

const router = Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', validateCardId, deleteCard);
router.put('/:cardId/likes', validateCardId, likeCard);
router.delete('/:cardId/likes', validateCardId, unlikeCard);

export default router;
