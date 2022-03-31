import TaskResolver from './task.resolver';
import ProjectResolver from './project.resolver';
import UserResolver from './user.resolver';

const resolvers = [TaskResolver, ProjectResolver, UserResolver] as const;

export default resolvers;
