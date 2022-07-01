import { Field, InputType } from 'type-graphql';

@InputType()
class DeleteUserInput {
  @Field(() => String)
  _id: string;
}

export default DeleteUserInput;
