import { Error } from 'mongoose';

export const MongooseDuplicateErrorCode = 11000;

export const isValidationError = (
  error: unknown,
): error is Error.ValidationError => error instanceof Error.ValidationError;

export const isCastError = (
  error: unknown,
): error is Error.CastError => error instanceof Error.CastError;

export const isDocumentNotFound = (
  error: unknown,
): error is Error.DocumentNotFoundError => error instanceof Error.DocumentNotFoundError;
