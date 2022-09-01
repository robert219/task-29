import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RegistrationService } from './registration.service';
import { Registration } from './entities/registration.entity';
import { CreateRegistrationInput } from './dto/create-registration.input';
import { RegistrationField } from './entities/registration-field';

@Resolver(() => Registration)
export class RegistrationResolver {
  constructor(private readonly registrationService: RegistrationService) {}

  @Mutation(() => Registration)
  createRegistration(
    @Args('createRegistrationInput')
    createRegistrationInput: CreateRegistrationInput,
  ) {
    return this.registrationService.create(createRegistrationInput);
  }

  @Query(() => [RegistrationField], { name: 'registrationFields' })
  getRegistrationFields() {
    return this.registrationService.getRegistrationFields();
  }
}
