import { mongoose, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import User from '../User/user.schema';
import Task from '../Task/task.schema';

@ObjectType()
class Comment {
  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  content: string;

  @Field(() => Task, { nullable: true })
  @prop({ ref: () => Task, required: true })
  task: Ref<Task>;

  @Field(() => User, { nullable: true })
  @prop({ ref: () => User, required: true })
  author: Ref<User>;

  @Field()
  @prop({ required: true })
  date: Date;

}

export default Comment;
