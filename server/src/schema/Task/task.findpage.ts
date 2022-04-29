import { Field, InputType, Int } from 'type-graphql';

@InputType()
class FindTaskByLimitAndPageInput {
    @Field(() => Int)
    limit: number;

    @Field(() => Int)
    page: number;
}

export default FindTaskByLimitAndPageInput;
