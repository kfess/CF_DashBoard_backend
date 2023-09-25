import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ISecretAdapter } from './adapter';
import { SecretService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: ISecretAdapter,
      useClass: SecretService,
    },
  ],
  exports: [ISecretAdapter],
})
export class SecretModule {}
