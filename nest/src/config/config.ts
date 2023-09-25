import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

// apply global config
export function applyGlobalConfig(app: INestApplication) {
  app.use(helmet()); // CSP, HSTS, XSS, etc.
  app.enableCors(); // CORS
  app.use(compression()); // GZIP
  app.use(cookieParser()); // Cookie parser
}
