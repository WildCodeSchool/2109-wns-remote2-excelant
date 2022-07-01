import {
  mongoose,
  prop,
  pre,
  ReturnModelType,
  queryMethod,
  index,
  plugin,
} from '@typegoose/typegoose';
import { AsQueryMethod } from '@typegoose/typegoose/lib/types';
import mongoosePaginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from 'type-graphql';
import PaginateMethod from '../../utils/PaginateMethodType';
import { registerRoles, Roles } from '../../types/user';

registerRoles();

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: User['email']
) {
  return this.findOne({ email });
}

export interface QueryHelpers {
  findByEmail: AsQueryMethod<typeof findByEmail>;
}

// eslint-disable-next-line func-names
@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
})
@index({ email: 1 })
@queryMethod(findByEmail)
@ObjectType()
@plugin(mongoosePaginate)
class User {
  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  password: string;

  @Field(() => String)
  @prop({ required: true })
  confirmPassword: string;

  @Field(() => [Roles])
  @prop({ required: true })
  roles: Roles[];

  static paginate: PaginateMethod<User>;
}

export default User;
