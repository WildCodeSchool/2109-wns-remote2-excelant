import { mongoose, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import User from '../User/user.schema';

@ObjectType()
class Comment {
  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  content: string;

  @Field(() => User, { nullable: true })
  @prop({ ref: () => User, required: true })
  user: Ref<User>;

  @Field()
  @prop({ required: true })
  date: Date;

}

export default Comment;
