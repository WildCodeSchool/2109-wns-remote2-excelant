import { InputType, Field } from 'type-graphql';

@InputType()
class UpdateUserEmailInput {
  @Field(() => String)
  email: string;
}

export default UpdateUserEmailInput;
