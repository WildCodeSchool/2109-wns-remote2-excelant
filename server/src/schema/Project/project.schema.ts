import { mongoose, plugin, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoosePaginate from 'mongoose-paginate-v2';
import PaginateMethod from '../../utils/PaginateMethodType';
import User from '../User/user.schema';

@ObjectType()
@plugin(mongoosePaginate)
class Project {
  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  status: string;

  @Field(() => User)
  @prop({ ref: () => User, required: true })
  projectManager: Ref<User>;

  @Field()
  @prop({ required: true })
  dueDate: Date;

  static paginate: PaginateMethod<Project>;
}

export default Project;
