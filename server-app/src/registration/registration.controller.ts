import { Body, Controller, Get, HttpException, Post } from '@nestjs/common';
import { RegistrationRequest } from './models/registration-request';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Get('fields')
  getRegistrationFields() {
    return this.registrationService.getRegistrationFields();
  }

  @Post()
  register(@Body() request: RegistrationRequest) {
    const throwRandomServerError = Math.random() >= 0.5;
    if (throwRandomServerError)
      throw new HttpException(
        'Some random error occured, please try again.',
        500,
      );
    else {
      return this.registrationService.register(request);
    }
  }
}
