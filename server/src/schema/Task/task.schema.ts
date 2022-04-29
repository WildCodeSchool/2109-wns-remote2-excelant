import { mongoose, plugin, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import Project from '../Project/project.schema';
import mongoosePaginate from 'mongoose-paginate-v2';
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

  @Field(() => String)
  @prop({ required: true })
  assigne: string;

  @Field()
  @prop({ required: true })
  dueDate: Date;

  @Field({ description: 'the description of the task' })
  @prop({ required: false })
  description: string;
  
  static paginate: PaginateMethod<Task>
}

export default Task;
