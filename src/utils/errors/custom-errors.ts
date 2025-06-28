/* eslint max-classes-per-file: 0, default-param-last: 0 */
import { HttpStatuses } from 'common';

type ErrDetails = Record<string, any>;

class HttpError extends Error {
  status: number;

  details?: ErrDetails;

  constructor(message: string, statusCode: number, details?: ErrDetails) {
    super(message);
    this.status = statusCode;
    this.name = new.target.name;
    this.details = details;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found', details?: ErrDetails) {
    super(message, HttpStatuses.NOT_FOUND, details);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request', details?: ErrDetails) {
    super(message, HttpStatuses.BAD_REQUEST, details);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden', details?: ErrDetails) {
    super(message, HttpStatuses.FORBIDDEN, details);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized', details?: ErrDetails) {
    super(message, HttpStatuses.UNAUTHORIZED, details);
  }
}

export class ConflictError extends HttpError {
  constructor(message: string = 'Conflict', details?: ErrDetails) {
    super(message, HttpStatuses.CONFLICT, details);
  }
}
