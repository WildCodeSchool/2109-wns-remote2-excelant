import { Field, ID, InputType } from 'type-graphql';

@InputType()
class FindOneUserInput {
  @Field(() => ID)
  _id: string;
}

export default FindOneUserInput;
