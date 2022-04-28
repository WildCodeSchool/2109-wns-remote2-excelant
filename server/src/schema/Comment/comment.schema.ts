import { mongoose, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import Task from '../Task/task.schema';

@ObjectType()
class Comment {

  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  content: string;

  @Field(() => [Task])
  @prop({ ref: () => Task, required: false})
  task?: Ref<Task>;

}

export default Comment;
