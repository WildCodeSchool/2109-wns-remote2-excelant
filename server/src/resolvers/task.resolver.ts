import { Mutation, Query, Arg } from 'type-graphql';
import CreateTaskInput from '../schema/task.create';
import { FindOneTaskById } from '../schema/task.find';
import Task from '../schema/task.schema';
import TaskService from '../service/task.service';

class TaskResolver {
  constructor(private taskService: TaskService) {
    this.taskService = new TaskService();
  }

  @Query(() => [Task])
  findAllTasks() {
    return this.taskService.findTasks();
  }

  @Query(() => Task)
  findOneTask(@Arg('input') input: FindOneTaskById) {
    return this.taskService.findOne(input);
  }

  @Mutation(() => Task)
  createTask(@Arg('input') input: CreateTaskInput) {
    return this.taskService.createTask(input);
  }
}

export default TaskResolver;
