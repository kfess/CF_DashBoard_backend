import serverlessExpress from '@vendia/serverless-express';
import compression from 'compression';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from '../../routes';
import helmet from 'helmet';
import { checkEnvVars } from '../../utils/checkEnvVars';

checkEnvVars();

const app = express();

app.use(compression({ level: 6 }));
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));
app.use(router);

// Export the handler for Lambda function
export const handler = serverlessExpress({ app });
