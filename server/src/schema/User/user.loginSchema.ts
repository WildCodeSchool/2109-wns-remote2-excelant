import { Field, ObjectType } from 'type-graphql';
import User from './user.schema';

@ObjectType()
export default class Login {
  @Field(() => User)
  user: User;

  @Field(() => String)
  accessToken: String;
}
