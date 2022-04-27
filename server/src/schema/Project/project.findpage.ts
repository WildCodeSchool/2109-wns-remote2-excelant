import { Field, InputType, Int } from 'type-graphql';

@InputType()
class FindProjectByLimitAndPageInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;
}

export default FindProjectByLimitAndPageInput;
