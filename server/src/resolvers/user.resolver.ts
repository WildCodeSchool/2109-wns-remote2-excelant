import { Arg, Mutation, Query } from "type-graphql";
import bcrypt from "bcrypt"
import CreateUserInput from "../schema/User/use.create";
import User from "../schema/User/user.schema";
import UserService from "../service/user.service";

class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService()
  }

  @Query(() => [User])
  findAllUsers() {
    return this.userService.findUsers()
  }

  @Mutation(() => User)
  createUser(@Arg('input') input: CreateUserInput) {
    const sercureInput = {
      email: input.email,
      password: bcrypt.hashSync(input.password, 6)
    }
    return this.userService.createUser(sercureInput)
  }
}

export default UserResolver
