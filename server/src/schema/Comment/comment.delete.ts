import { Field, ID, InputType } from 'type-graphql';

@InputType()
class DeleteCommentInput {
  @Field(() => ID)
  _id: string;
}

export default DeleteCommentInput;