import TaskResolver from './task.resolver';
import ProjectResolver from './project.resolver';

const resolvers = [TaskResolver, ProjectResolver] as const;

export default resolvers;
