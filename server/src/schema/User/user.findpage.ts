import { Field, InputType, Int } from 'type-graphql';

@InputType()
class FindUserByLimitAndPageInput {
  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  page: number;
}

export default FindUserByLimitAndPageInput;
