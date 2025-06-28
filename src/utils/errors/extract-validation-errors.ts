import mongoose from 'mongoose';

export const extractValidationErrors = (
  err: mongoose.Error.ValidationError,
) => {
  const formatted: Record<string, string> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const [field, errorObj] of Object.entries(err.errors)) {
    formatted[field] = errorObj.message;
  }

  return formatted;
};
