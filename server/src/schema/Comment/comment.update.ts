import { Field, InputType } from 'type-graphql';

@InputType()
class UpdateCommentInput {

  @Field(() => String)
  content: string;

  @Field(() => String)
  user: string;

  @Field()
  date: Date;

}

export default UpdateCommentInput;