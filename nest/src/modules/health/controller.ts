import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { name, version } from '../../../package.json';
import { SwaggerResponse } from './swagger';

@Controller()
@ApiTags('Health')
export class HealthController {
  @Get('/health')
  @ApiResponse(SwaggerResponse.get[200])
  async getHealth(): Promise<{ message: string }> {
    return { message: `${name} v${version} available` };
  }
}
