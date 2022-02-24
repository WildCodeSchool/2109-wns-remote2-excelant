import { Field, InputType } from 'type-graphql';

@InputType()
class DeleteProjectInput {
    @Field(() => String)
    _id: string;
}

export default DeleteProjectInput;
