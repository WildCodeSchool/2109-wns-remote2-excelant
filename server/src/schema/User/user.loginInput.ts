import { Field, InputType } from 'type-graphql';

@InputType()
export default class LoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
