import { Field, InputType } from 'type-graphql';

@InputType()
class FindOneTaskInput {
  @Field(() => String)
  _id: string;
}

export default FindOneTaskInput;
