import { Field, InputType } from 'type-graphql';

@InputType()
class DeleteCommentInput {
    @Field(() => String)
    _id: string;
}

export default DeleteCommentInput;
