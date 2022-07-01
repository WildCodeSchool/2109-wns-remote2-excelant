import TaskResolver from './task.resolver';
import ProjectResolver from './project.resolver';
import UserResolver from './user.resolver';
import CommentResolver from './comment.resolver';

const resolvers = [TaskResolver, ProjectResolver, UserResolver, CommentResolver] as const;

export default resolvers;
