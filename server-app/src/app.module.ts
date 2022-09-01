import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';

@Module({
  imports: [RegistrationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
