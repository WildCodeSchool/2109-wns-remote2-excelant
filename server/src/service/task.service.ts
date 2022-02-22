import CreateTaskInput from '../schema/task.create';
import { FindOneTaskById } from '../schema/task.find';
import { TaskModel } from '../schema/task.schema';

class TaskService {
  // eslint-disable-next-line
  async findTasks() {
    return TaskModel.find().lean();
  }

  async findOne(input: FindOneTaskById) {
    return TaskModel.findById(input);
  }

  // eslint-disable-next-line
  async createTask(input: CreateTaskInput) {
    return TaskModel.create(input);
  }
}

export default TaskService;
