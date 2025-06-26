import 'express';

declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: string;
    DB_URL: string;
    JWT_SECRET: string;
  }
}

// TODO: remove after auth scope completion
declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      _id: string;
    };
  }
}
