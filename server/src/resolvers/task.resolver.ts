import { Mutation, Query, Arg } from 'type-graphql';
import CreateTaskInput from '../schema/task.create';
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

  @Mutation(() => Task)
  createTask(@Arg('input') input: CreateTaskInput) {
    return this.taskService.createTask(input);
  }
}

export default TaskResolver;
