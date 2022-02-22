import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import DateTime from './custom-scalars/DateTime';

@ObjectType()
class Task {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  project: string;

  @Field(() => String)
  @prop({ required: true })
  status: string;

  @Field(() => String)
  @prop({ required: true })
  assigne: string;

  @Field(() => DateTime)
  @prop({ required: true })
  dueDate: Date;
}

export const TaskModel = getModelForClass(Task);

export default Task;
