import { UserModel } from '../schema';
import CreateUserInput from '../schema/User/user.create';

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async findUsers() {
    const users = await UserModel.find().lean();
    return users;
  }

  // eslint-disable-next-line class-methods-use-this
  async createUser(input: CreateUserInput) {
    return UserModel.create(input)
  }
}

export default UserService;
