import { mongoose, plugin, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoosePaginate from 'mongoose-paginate-v2';
import Project from '../Project/project.schema';
import User from '../User/user.schema';
import Comment from '../Comment/comment.schema';
import PaginateMethod from '../../utils/PaginateMethodType';

@ObjectType()
@plugin(mongoosePaginate)
class Task {
  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => Project)
  @prop({ ref: () => Project })
  project: Ref<Project>;

  @Field(() => String)
  @prop({ required: true })
  status: string;

  @Field(() => User)
  @prop({ ref: () => User})
  assigne: Ref<User>;

  @Field()
  @prop({ required: true })
  dueDate: Date;

  @Field({ description: 'the description of the task', nullable: true })
  @prop({ required: false })
  description?: string;

  @Field(() => [Comment], {nullable: true})
  @prop({ ref: () => Comment, required: false, default: [] })
  comments: Ref<Comment>[];

  static paginate: PaginateMethod<Task>;
}

export default Task;
