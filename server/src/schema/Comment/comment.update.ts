import { Field, InputType } from 'type-graphql';
import UserInput from '../User/user.input';

@InputType()
class UpdateCommentInput {

  @Field(() => String)
  content: string;

  @Field(() => UserInput, { nullable: true })
  user: string;

  @Field()
  date: Date;

}

export default UpdateCommentInput;