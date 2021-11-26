import CreateTaskInput from '../schema/task.create';
import { TaskModel } from '../schema/task.schema';

class TaskService {
  // eslint-disable-next-line
  async findTasks() {
    return TaskModel.find().lean();
  }

  // eslint-disable-next-line
  async createTask(input: CreateTaskInput) {
    return TaskModel.create(input);
  }
}

export default TaskService;
