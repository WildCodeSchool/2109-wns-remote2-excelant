import { InputType, Field } from 'type-graphql';

@InputType()
class UpdateUserPasswordInput {
  @Field(() => String)
  password: string;
}

export default UpdateUserPasswordInput;
