import { InputType, Field } from 'type-graphql';
import DateTime from './custom-scalars/DateTime';

@InputType()
class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  projectManager: string;

  @Field(() => DateTime)
  dueDate: Date;
}

export default CreateProjectInput;
