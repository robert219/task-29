import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRegistrationInput {
  @Field({ nullable: true })
  first_name?: string;
  @Field({ nullable: true })
  middle_name?: string;
  @Field({ nullable: true })
  last_name?: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  phone_number?: string;
  @Field()
  password: string;
}
