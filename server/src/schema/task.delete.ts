import { Field, InputType } from 'type-graphql';

@InputType()
class DeleteTaskInput {
    @Field(() => String)
    _id: string;
}

export default DeleteTaskInput;
