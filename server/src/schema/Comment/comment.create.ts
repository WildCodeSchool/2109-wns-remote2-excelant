import { InputType, Field } from 'type-graphql';
import TaskInput from '../Task/task.input';

@InputType()
class CreateCommentInput {

  @Field(() => String)
  content: string;

  @Field(() => TaskInput, { nullable: true })
  task: string;
}

export default CreateCommentInput;
