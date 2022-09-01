import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Registration {
  @Field(() => Int)
  id: number;
  @Field({ nullable: true })
  name?: string;
}
