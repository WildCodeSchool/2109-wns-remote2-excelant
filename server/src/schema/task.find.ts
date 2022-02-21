import { Field, InputType } from 'type-graphql';

@InputType()
export class FindOneTaskById {
  @Field(() => String)
  _id: string;
}
