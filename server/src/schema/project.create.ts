import { InputType, Field } from 'type-graphql';

@InputType()
class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  status: string;

  @Field(() => String)
  projectManager: string;

  @Field(() => String)
  dueDate: string;
}

export default CreateProjectInput;
