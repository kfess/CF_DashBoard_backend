import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfraModule } from 'infra/module';
import { HealthModule } from 'modules/health/module';

@Module({
  imports: [InfraModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
