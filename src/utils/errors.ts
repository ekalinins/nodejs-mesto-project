/* eslint max-classes-per-file: 0 */
import { HttpStatuses } from 'common';

class HttpError extends Error {
  status: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.status = statusCode;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Not Found') {
    super(message, HttpStatuses.NOT_FOUND);
  }
}

export class BadRequestError extends HttpError {
  constructor(message: string = 'Bad Request') {
    super(message, HttpStatuses.BAD_REQUEST);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(message, HttpStatuses.FORBIDDEN);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(message, HttpStatuses.UNAUTHORIZED);
  }
}
