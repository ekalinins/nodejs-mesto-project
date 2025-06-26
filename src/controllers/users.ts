import { NextFunction, Request, Response } from 'express';
import User, { IUser } from 'models/user';
import {
  BadRequestError, isCastError, isDocumentNotFound, isValidationError, NotFoundError,
} from 'utils';
import { ERROR_MESSAGES } from 'common/error-messages';
import { HttpStatuses } from 'common';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { JWT_SECRET = 'dev-secret-key' } = process.env;

export const getAllUsers = async (
  _: Request,
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

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      next(new NotFoundError(ERROR_MESSAGES.USER_NOT_EXIST));
      return;
    }

    res.send(user.toObject());
  } catch (err) {
    if (isCastError(err)) {
      next(new NotFoundError(ERROR_MESSAGES.USER_INCORRECT_ID));
      return;
    }

    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { avatar, name, about } = req.body as IUser;

    const createdUser = await User.create({ avatar, name, about });

    res.status(HttpStatuses.CREATED).send(createdUser.toObject());
  } catch (err) {
    if (isValidationError(err)) {
      next(new BadRequestError(ERROR_MESSAGES.USER_CREATE_INVALID_DATA));
      return;
    }

    next(err);
  }
};

export const updateUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
    if (isValidationError(err)) {
      next(new BadRequestError(ERROR_MESSAGES.USER_PROFILE_INCORRECT_DATA));
      return;
    }

    next(err);
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
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
    if (isValidationError(err)) {
      next(new BadRequestError(ERROR_MESSAGES.USER_AVATAR_INCORRECT_DATA));
      return;
    }

    next(err);
  }
};

// TODO: test
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password').orFail();

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      next(new BadRequestError(ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS));
      return;
    }

    const token = jwt.sign({ _id: user.id }, JWT_SECRET, { expiresIn: '14d' });

    res.cookie('token', token, { httpOnly: true });
  } catch (err) {
    if (isDocumentNotFound(err)) {
      next(new BadRequestError(ERROR_MESSAGES.INVALID_LOGIN_CREDENTIALS));
      return;
    }

    next(err);
  }
};
