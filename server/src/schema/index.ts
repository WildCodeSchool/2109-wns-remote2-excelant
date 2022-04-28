import { getModelForClass } from '@typegoose/typegoose';
import Project from './Project/project.schema';
import Comment from './Comment/comment.schema';
import Task from './Task/task.schema';
import User from './User/user.schema';

export const TaskModel = getModelForClass(Task);
export const ProjectModel = getModelForClass(Project);
export const UserModel = getModelForClass(User);
export const CommentModel = getModelForClass(Comment);
