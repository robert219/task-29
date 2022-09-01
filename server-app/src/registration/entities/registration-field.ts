import { Field, ObjectType } from '@nestjs/graphql';
import { FieldValidation } from './field-validation';

@ObjectType()
export class RegistrationField {
  @Field()
  type: string;
  @Field()
  name: string;
  @Field()
  label: string;
  @Field()
  required: boolean;
  @Field(() => [FieldValidation], { nullable: true })
  validations?: FieldValidation[];
}
