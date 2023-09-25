import { Controller, Get } from '@nestjs/common';


@Controller('contests')
export class ContestController {
  @Get()
  async getContests() {}
}
