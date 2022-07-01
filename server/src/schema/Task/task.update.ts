import { InputType, Field } from 'type-graphql';
import ProjectInput from '../Project/project.input';
import UserInput from '../User/user.input';


@InputType()
class UpdateTaskInput {
  @Field(() => String)
  name: string;

  @Field(() => ProjectInput, { nullable: true })
  project: string;

  @Field(() => String)
  status: string;

  @Field(() => UserInput)
  assigne: string;

  @Field()
  dueDate: Date;

  @Field({ description: 'the description of the task', nullable: true })
  description?: string;
}

export default UpdateTaskInput;
