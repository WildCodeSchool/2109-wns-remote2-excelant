import { InputType, Field } from 'type-graphql';
import {prop} from "@typegoose/typegoose";

@InputType()
class UpdateTaskInput {
    @Field(() => String)
    name: string;

    @Field(() => String)
    project: string;

    @Field(() => String)
    status: string;

    @Field(() => String)
    assigne: string;

    @Field(() => String)
    dueDate: string;
}

export default UpdateTaskInput;