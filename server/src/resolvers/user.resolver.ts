import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import CreateUserInput from '../schema/User/user.create';
import User from '../schema/User/user.schema';
import UserService from '../service/user.service';
import FindOneUserInput from '../schema/User/user.find';
import UpdateUserEmailInput from '../schema/User/user.updateEmail';
import UpdateUserPasswordInput from '../schema/User/user.updatePassword';
import Context from '../types/context';
import LoginInput from '../schema/User/user.login';

@Resolver()
class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Query(() => [User])
  findAllUsers() {
    return this.userService.findUsers();
  }

  @Query(() => User)
  findOneUser(@Arg('input') input: FindOneUserInput) {
    return this.userService.findOneUser(input);
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String) // Returns the JWT
  login(@Arg('input') input: LoginInput, @Ctx() context: Context) {
    return this.userService.login(input);
  }

  @Mutation(() => User)
  updateUserEmail(
    @Arg('_id') id: string,
    @Arg('input') input: UpdateUserEmailInput
  ) {
    return this.userService.updateUserEmail(id, input);
  }

  @Mutation(() => User)
  updateUserPassWord(
    @Arg('_id') id: string,
    @Arg('input') input: UpdateUserPasswordInput
  ) {
    return this.userService.updateUserPassword(id, input);
  }

  @Mutation(() => User)
  deleteUser(@Arg('_id') id: string) {
    return this.userService.deleteUser(id);
  }
}

export default UserResolver;
