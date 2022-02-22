import { InputType, Field } from 'type-graphql';
import DateTime from './custom-scalars/DateTime';

@InputType()
class CreateTaskInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  project: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  assigne: string;

  @Field(() => DateTime)
  dueDate: Date;
}

export default CreateTaskInput;
