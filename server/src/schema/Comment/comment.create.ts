import { Field, InputType } from 'type-graphql';

@InputType()
class CreateCommentInput {

  @Field(() => String)
  content: string;

  @Field(() => String)
  user: string;

  @Field()
  date: Date;

}

export default CreateCommentInput;