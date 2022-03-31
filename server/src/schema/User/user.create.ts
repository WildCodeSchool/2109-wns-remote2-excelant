import { Field, InputType } from "type-graphql";

@InputType()
class CreateUserInput {
  @Field(() => String)
  email: string

  @Field(() => String)
  password: string
}

export default CreateUserInput
