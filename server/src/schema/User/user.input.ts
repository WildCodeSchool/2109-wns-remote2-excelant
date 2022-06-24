import { Field, ID, InputType } from 'type-graphql';

@InputType()
class UserInput {
  @Field(() => ID)
  _id: string;
}

export default UserInput;