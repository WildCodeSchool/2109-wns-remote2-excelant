import { Field, InputType } from 'type-graphql';
import UserInput from '../User/user.input';
import TaskInput from '../Task/task.input';

@InputType()
class CreateCommentInput {

  @Field(() => String)
  content: string;

  @Field(() => UserInput)
  author: string;

  @Field(() => TaskInput)
  task: object;

  @Field()
  date: Date;

}

export default CreateCommentInput;