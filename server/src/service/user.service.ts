import { ApolloError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { UserModel } from '../schema';
import CreateUserInput from '../schema/User/user.create';
import DeleteUserInput from '../schema/User/user.delete';
import FindOneUserInput from '../schema/User/user.find';
import FindUserByLimitAndPageInput from '../schema/User/user.findpage';
import LoginInput from '../schema/User/user.login';
import UpdateUserEmailInput from '../schema/User/user.updateEmail';
import UpdateUserPasswordInput from '../schema/User/user.updatePassword';
import Context from '../types/context';
import { signJwt } from '../utils/jwt';

class UserService {
  // eslint-disable-next-line class-methods-use-this
  async findUsers() {
    const users = await UserModel.find().lean();
    return users;
  }

  // eslint-disable-next-line class-methods-use-this
  async findUserByLimitAndPage(input: FindUserByLimitAndPageInput) {
    return UserModel.paginate({}, input);
  }

  // eslint-disable-next-line class-methods-use-this
  async findOneUser(input: FindOneUserInput) {
    const user = await UserModel.find().findByEmail(input.email);
    return user;
  }

  // eslint-disable-next-line class-methods-use-this
  async createUser(input: CreateUserInput) {
    return UserModel.create(input);
  }

  // eslint-disable-next-line class-methods-use-this
  async login(input: LoginInput, context: Context) {
    const user = await UserModel.find().findByEmail(input.email).lean();

    const e = 'Invalid email or password';

    if (!user) throw new ApolloError(e);

    const passwordIsValid = await bcrypt.compare(input.password, user.password);
    if (!passwordIsValid) throw new ApolloError(e);

    const token = signJwt(user);

    context.res.cookie('accessToken', token, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return token;
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
  async deleteUser(input: DeleteUserInput) {
    return UserModel.findByIdAndDelete(input._id);
  }
}

export default UserService;
