import { createUnionType, Field, ObjectType } from '@nestjs/graphql';

// const fieldValueType = createUnionType({
//   name: 'fieldValueType',
//   types: () => [any as any] as const,
// });

@ObjectType()
export class FieldValidation {
  @Field()
  name: string;
  @Field()
  message: string;
  @Field()
  value: string;
}
