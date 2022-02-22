import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import DateTime from './custom-scalars/DateTime';

@ObjectType()
class Project {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true })
  status: string;

  @Field(() => String)
  @prop({ required: true })
  projectManager: string;

  @Field(() => DateTime)
  @prop({ required: true })
  dueDate: Date;
}

export const ProjectModel = getModelForClass(Project);

export default Project;
