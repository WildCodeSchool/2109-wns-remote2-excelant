import { Arg, Mutation, Query } from 'type-graphql';
import bcrypt from 'bcrypt';
import CreateUserInput from '../schema/User/user.create';
import User from '../schema/User/user.schema';
import UserService from '../service/user.service';
import FindOneUserInput from '../schema/User/user.find';
import UpdateUserEmailInput from '../schema/User/user.updateEmail';
import UpdateUserPasswordInput from '../schema/User/user.updatePassword';

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
    const secureInput = {
      email: input.email,
      password: bcrypt.hashSync(input.password, 6),
      confirmPassword: bcrypt.hashSync(input.confirmPassword, 6),
    };
    return this.userService.createUser(secureInput);
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
    const secureInput = { password: bcrypt.hashSync(input.password, 6) };
    return this.userService.updateUserPassword(id, secureInput);
  }

  @Mutation(() => User)
  deleteUser(@Arg('_id') id: string) {
    return this.userService.deleteUser(id);
  }
}

export default UserResolver;
