import { Field, ID, InputType } from 'type-graphql';

@InputType()
class FindOneProjectInput {
  @Field(() => ID)
  _id: string;
}

export default FindOneProjectInput;
