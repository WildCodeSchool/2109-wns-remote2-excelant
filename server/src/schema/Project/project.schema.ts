import { mongoose, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
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
}

export default Project;
