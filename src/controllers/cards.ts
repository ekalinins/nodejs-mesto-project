import { NextFunction, Request, Response } from 'express';
import Card from 'models/card';
import {
  BadRequestError,
  ForbiddenError,
  isCastError,
  isValidationError,
  NotFoundError,
} from 'utils';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from 'common/error-messages';

export const getAllCards = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({}).select('-__v');
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, link } = req.body;

    const card = await Card.create({ name, link, owner: req.user?._id });

    res.send(card.toObject());
  } catch (err) {
    if (isValidationError(err)) {
      next(new BadRequestError(ERROR_MESSAGES.CARD_CREATE_INVALID_DATA));
      return;
    }

    next(err);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { user } = req;

    const cardToDelete = await Card.findById({ _id: req.params.cardId });

    if (!cardToDelete) {
      next(new NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND));
      return;
    }

    if (user?._id !== cardToDelete.owner.toString()) {
      next(new ForbiddenError(ERROR_MESSAGES.CARD_DELETE_FORBIDDEN));
      return;
    }

    await cardToDelete.deleteOne();

    res.json({ message: SUCCESS_MESSAGES.CARD_DELETED });
  } catch (err) {
    if (isCastError(err)) {
      next(new NotFoundError(ERROR_MESSAGES.CARD_INCORRECT_ID));
      return;
    }

    next(err);
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?._id;

    const cardToLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: userId } },
      { new: true },
    );

    if (!cardToLike) {
      next(new NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND));
      return;
    }

    res.send(cardToLike.toObject());
  } catch (err) {
    if (isCastError(err)) {
      next(new NotFoundError(ERROR_MESSAGES.CARD_INCORRECT_ID));
      return;
    }

    next(err);
  }
};

export const unlikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cardToUnlike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user?._id } },
      { new: true },
    );

    if (!cardToUnlike) {
      next(new NotFoundError(ERROR_MESSAGES.CARD_NOT_FOUND));
      return;
    }

    res.send(cardToUnlike.toObject());
  } catch (err) {
    if (isCastError(err)) {
      next(new NotFoundError(ERROR_MESSAGES.CARD_INCORRECT_ID));
      return;
    }

    next(err);
  }
};
