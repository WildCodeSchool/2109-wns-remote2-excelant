import { getModelForClass } from '@typegoose/typegoose';
import Project from './Project/project.schema';
import Task from './Task/task.schema';

export const TaskModel = getModelForClass(Task);
export const ProjectModel = getModelForClass(Project);
