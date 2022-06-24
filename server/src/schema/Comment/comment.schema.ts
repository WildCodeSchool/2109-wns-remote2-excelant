import { mongoose, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class Comment {
  @Field(() => ID)
  readonly _id: mongoose.Schema.Types.ObjectId;

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  content: string;

  @Field(() => String, { nullable: true })
  @prop({ required: true })
  user: string;

  @Field()
  @prop({ required: true })
  date: Date;

}

export default Comment;
