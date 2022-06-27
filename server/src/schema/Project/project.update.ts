import { InputType, Field } from 'type-graphql';
import UserInput from '../User/user.input';

@InputType()
class UpdateProjectInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    status: string;

    @Field(() => UserInput)
    projectManager: string;

    @Field()
    dueDate: Date;
}

export default UpdateProjectInput;
