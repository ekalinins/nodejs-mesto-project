import 'module-alias/register';

import mongoose from 'mongoose';
import 'dotenv/config';
import { Server } from 'http';
import { logger } from '@/utils';
import app from './app';

const { APP_PORT = 3001, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

let server: Server | undefined;

const shutdown = async (exitCode = 0) => {
  if (server) {
    await new Promise<void>((resolve) => {
      server?.close(() => {
        logger('HTTP server closed');
        resolve();
      });
    });
  }

  try {
    await mongoose.connection.close();
    logger('MongoDB connection closed');
  } catch (err: any) {
    logger(`Error closing MongoDB connection: ${err.message}`, 'error');
  }

  process.exit(exitCode);
};

const start = async () => {
  try {
    await mongoose.connect(DB_URL!);
    logger('Connected to MongoDB');

    server = app.listen(APP_PORT, () => logger(`Listening on port ${APP_PORT}`));
  } catch (err: any) {
    logger(`Failed to start server: ${err.message}`, 'error');
    await shutdown(1);
  }
};

const unexpectedErrorHandler = async (reason: string) => {
  logger(reason, 'error');
  await shutdown(1);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
process.on('uncaughtException', (err) => unexpectedErrorHandler(`Uncaught Exception: ${err.message}`));
process.on('unhandledRejection', (reason) => unexpectedErrorHandler(`Unhandled Rejection: ${reason}`));

start();
