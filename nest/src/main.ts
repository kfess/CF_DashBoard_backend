import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { name, version, description } from '../package.json';
import { ISecretAdapter } from './infra/secrets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // CSP, HSTS, XSS, etc.
  app.enableCors(); // CORS
  app.use(compression()); // GZIP
  app.use(cookieParser()); // Cookie parser

  const { ENV, HOST, PORT, POSTGRES_URL } = app.get(ISecretAdapter);
  console.log(`ENV: ${ENV}`);
  // Setup Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .addBearerAuth()
    .setVersion(version)
    .addServer(HOST)
    .addTag('Swagger Documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT);
}
bootstrap();
