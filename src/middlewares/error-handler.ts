import { ErrorRequestHandler } from 'express';
import { HttpStatuses } from '../common';
import { ERROR_MESSAGES } from '../common/error-messages';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  const {
    message,
    status = HttpStatuses.INTERNAL_SERVER_ERROR,
    details = undefined,
  } = err;

  const msg = message === HttpStatuses.INTERNAL_SERVER_ERROR
    ? ERROR_MESSAGES.INTERNAL_ERROR
    : err.message;

  res.status(status).json({ message: msg, details });
};
