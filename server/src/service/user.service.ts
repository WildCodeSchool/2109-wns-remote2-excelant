import { UserModel } from '../schema';
import CreateUserInput from '../schema/User/user.create';
import FindOneUserInput from '../schema/User/user.find';
import UpdateUserEmailInput from '../schema/User/user.updateEmail';
import UpdateUserPasswordInput from '../schema/User/user.updatePassword';

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async findUsers() {
    const users = await UserModel.find().lean();
    return users;
  }

  // eslint-disable-next-line class-methods-use-this
  async findOneUser(input: FindOneUserInput) {
    const user = await UserModel.findOne(input);
    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  // eslint-disable-next-line class-methods-use-this
  async updateUserEmail(id: string, input: UpdateUserEmailInput) {
    return UserModel.findByIdAndUpdate(id, input);
  }

  // eslint-disable-next-line class-methods-use-this
  async updateUserPassword(id: string, input: UpdateUserPasswordInput) {
    return UserModel.findByIdAndUpdate(id, input);
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteUser(id: string) {
    return UserModel.findByIdAndDelete(id);
  }
}

export default UserService;
