import { mongoose, plugin, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import mongoosePaginate from 'mongoose-paginate-v2';
import PaginateMethod from '../../utils/PaginateMethodType';

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

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  projectManager: string;

  @Field()
  @prop({ required: true })
  dueDate: Date;

  static paginate: PaginateMethod<Project>;
}

export default Project;
