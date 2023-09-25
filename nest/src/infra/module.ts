import { Module } from '@nestjs/common';
import { SecretModule } from './secrets';

@Module({ imports: [SecretModule] })
export class InfraModule {}
