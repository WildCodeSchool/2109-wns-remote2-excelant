import { InputType, Field } from 'type-graphql';
import ProjectInput from '../Project/project.input';

@InputType()
class UpdateTaskInput {
  @Field(() => String)
  name: string;

  @Field(() => ProjectInput, { nullable: true })
  project: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  assigne: string;

  @Field()
  dueDate: Date;
}

export default UpdateTaskInput;
