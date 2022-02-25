import { Field, ID, InputType } from 'type-graphql';

@InputType()
class TaskInput {
  @Field(() => ID)
  _id: string;
}

export default TaskInput;
