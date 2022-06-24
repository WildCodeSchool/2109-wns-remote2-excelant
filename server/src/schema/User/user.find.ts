import { Field, InputType } from 'type-graphql';

@InputType()
class FindOneUserInput {
  @Field(() => String)
  email: string;
}

export default FindOneUserInput;
