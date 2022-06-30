import { IsEmail, MinLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { registerRoles, Roles } from '../../types/user';

registerRoles();

@InputType()
class CreateUserInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @Field(() => String)
  password: string;

  @MinLength(6, { message: 'password must be at least 6 characters long' })
  @Field(() => String)
  confirmPassword: string;

  @Field(() => [Roles])
  roles: Roles[];
}

export default CreateUserInput;
