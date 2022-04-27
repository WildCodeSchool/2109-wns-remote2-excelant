import { InputType, Field } from 'type-graphql';

@InputType()
class UpdateProjectInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    status: string;

    @Field(() => String)
    projectManager: string;

    @Field()
    dueDate: Date;
}

export default UpdateProjectInput;
