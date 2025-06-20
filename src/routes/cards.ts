import { Router } from 'express';
import {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} from 'controllers/cards';

const router = Router();

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/like', likeCard);
router.delete('/me/avatar', unlikeCard);

export default router;
