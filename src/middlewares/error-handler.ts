import { ErrorRequestHandler } from 'express';
import { HttpStatuses } from 'common';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const { message, status = HttpStatuses.INTERNAL_SERVER_ERROR } = err;

  const msg = message === HttpStatuses.INTERNAL_SERVER_ERROR
    ? 'Internal Server Error'
    : err.message;

  res.status(status).json({ message: msg, status });
};
