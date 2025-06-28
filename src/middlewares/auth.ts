import { NextFunction, Request, Response } from 'express';
import { UnauthorizedError } from 'utils';
import { ERROR_MESSAGES } from 'common/error-messages';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { DEFAULT_JWT_SECRET } from 'common/constants';

const { JWT_SECRET = DEFAULT_JWT_SECRET } = process.env;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.cookies;

  if (!token) {
    next(new UnauthorizedError(ERROR_MESSAGES.AUTH_REQUESTED));
    return;
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET) as JwtPayload;
    next();
  } catch (_: unknown) {
    next(new UnauthorizedError(ERROR_MESSAGES.INCORRECT_TOKEN));
  }
};
