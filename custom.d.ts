import { TokenPayload } from './src/shared/libs/modules/auth';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
