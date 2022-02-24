import { InputType, Field } from 'type-graphql';

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

  @Field()
  dueDate: Date;
}

export default CreateTaskInput;
