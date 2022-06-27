import { Field, InputType } from 'type-graphql';
import UserInput from '../User/user.input';

@InputType()
class CreateCommentInput {

  @Field(() => String)
  content: string;

  @Field(() => UserInput)
  user: string;

  @Field()
  date: Date;

}

export default CreateCommentInput;