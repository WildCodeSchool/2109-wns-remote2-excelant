import { Mutation, Query, Arg, Authorized } from 'type-graphql';
import CreateTaskInput from '../schema/Task/task.create';
import FindOneTaskById from '../schema/Task/task.find';
import Task from '../schema/Task/task.schema';
import TaskService from '../service/task.service';
import UpdateTaskInput from '../schema/Task/task.update';
import DeleteTaskInput from '../schema/Task/task.delete';
import FindTaskByLimitAndPageInput from '../schema/Task/task.findpage';
import TaskPage from '../schema/Task/task.page';
import { Roles } from '../types/user';

class TaskResolver {
  constructor(private taskService: TaskService) {
    this.taskService = new TaskService();
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Query(() => [Task])
  findAllTasks() {
    return this.taskService.findTasks();
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Query(() => TaskPage)
  findTaskByLimitAndPage(@Arg('input') input: FindTaskByLimitAndPageInput) {
    return this.taskService.findTaskByLimitAndPage(input);
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Query(() => Task)
  findOneTask(@Arg('input') input: FindOneTaskById) {
    return this.taskService.findOne(input);
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Mutation(() => Task)
  createTask(@Arg('input') input: CreateTaskInput) {
    return this.taskService.createTask(input);
  }

  @Authorized(Roles.ADMIN, Roles.USER)
  @Mutation(() => Task)
  updateTask(@Arg('_id') id: string, @Arg('input') input: UpdateTaskInput) {
    return this.taskService.updateTask(id, input);
  }

  @Authorized(Roles.ADMIN)
  @Mutation(() => Task)
  deleteTask(@Arg('input') input: DeleteTaskInput) {
    return this.taskService.deleteTask(input);
  }
}

export default TaskResolver;
