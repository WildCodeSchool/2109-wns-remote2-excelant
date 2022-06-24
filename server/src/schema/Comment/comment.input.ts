import { Field, ID, InputType } from 'type-graphql';

@InputType()
class CommentInput {
  @Field(() => ID)
  _id: string;
}

export default CommentInput;