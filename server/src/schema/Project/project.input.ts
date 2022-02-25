import { Field, ID, InputType } from 'type-graphql';

@InputType()
class ProjectInput {
  @Field(() => ID)
  _id: string;
}

export default ProjectInput;
