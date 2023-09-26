import { Test, TestingModule } from '@nestjs/testing';
import { name, version } from '../../../../package.json';
import { HealthController } from '../controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();
    healthController = app.get<HealthController>(HealthController);
  });

  describe('getHealth', () => {
    it('should return name and version', async () => {
      expect(await healthController.getHealth()).toEqual({
        message: `${name} v${version} available`,
      });
    });
  });
});
