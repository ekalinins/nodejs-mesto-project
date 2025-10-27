import 'express';
import { Payload } from '@/types';

declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: string;
    DB_URL: string;
    JWT_SECRET: string;
  }
}

declare module 'jsonwebtoken' {
  export interface JwtPayload extends Payload {}
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: Payload;
  }
}
