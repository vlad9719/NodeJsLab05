import { Controller, Get } from '@nestjs/common';

@Controller('api/healthcheck')
export class HealthcheckController {

  @Get()
  healthCheck(): object {
    return {
      message: 'Server is running',
    };
  }
}
