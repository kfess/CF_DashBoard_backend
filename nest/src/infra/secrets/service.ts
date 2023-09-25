import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ISecretAdapter } from './adapter';

@Injectable()
export class SecretService extends ConfigService implements ISecretAdapter {
  constructor() {
    super();
  }

  ENV = this.get<string>('ENV') || 'development';

  PORT = this.get<number>('PORT') || 3000;

  HOST = this.get<string>('HOST') || 'localhost';

  POSTGRES_URL = this.get<string>('POSTGRES_URL') || '';

  JWT_SECRET_KEY = this.get<string>('JWT_SECRET_KEY');
}
