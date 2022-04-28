import { getModelForClass } from '@typegoose/typegoose';
import Project from './Project/project.schema';
import Task from './Task/task.schema';
import User, { QueryHelpers } from './User/user.schema';

export const TaskModel = getModelForClass(Task);
export const ProjectModel = getModelForClass(Project);
export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);
