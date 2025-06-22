import { NextFunction, Request, Response } from 'express';
import User, { IUser } from 'models/user';
import { BadRequestError, NotFoundError } from 'utils';
import { ERROR_MESSAGES } from 'common/error-messages';
import { HttpStatuses } from 'common';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({}).select('-__v');

    res.send(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      next(new NotFoundError(ERROR_MESSAGES.USER_NOT_EXIST));
      return;
    }

    res.send(user.toObject());
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { avatar, name, about } = req.body as IUser;

    if (!avatar || !name || !about) {
      next(new BadRequestError(ERROR_MESSAGES.USER_CREATE_INVALID_DATA));
      return;
    }

    const createdUser = await User.create({ avatar, name, about });

    res.status(HttpStatuses.CREATED).send(createdUser.toObject());
  } catch (err) {
    next(err);
  }
};

export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body?.name && !req.body.about) {
      next(new BadRequestError(ERROR_MESSAGES.USER_PROFILE_INCORRECT_DATA));
      return;
    }

    const { name, about } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      { name, about },
      { new: true, runValidators: true },
    );

    if (!user) {
      next(new NotFoundError(ERROR_MESSAGES.USER_NOT_EXIST));
      return;
    }

    res.send(user.toObject());
  } catch (err) {
    next(err);
  }
};

export const updateUserAvatar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.avatar) {
      next(new BadRequestError(ERROR_MESSAGES.USER_AVATAR_INCORRECT_DATA));
      return;
    }

    const { avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user?._id,
      { avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      next(new NotFoundError(ERROR_MESSAGES.USER_NOT_EXIST));
      return;
    }

    res.send(updatedUser.toObject());
  } catch (err) {
    next(err);
  }
};
