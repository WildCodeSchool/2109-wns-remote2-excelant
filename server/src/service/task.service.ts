import CreateTaskInput from '../schema/task.create';
import { FindOneTaskById } from '../schema/task.find';
import { TaskModel } from '../schema/task.schema';
import UpdateTaskInput from '../schema/task.update';

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

  async updateTask(id: string, input: UpdateTaskInput) {
    return TaskModel.findByIdAndUpdate(id, input);
  }
}

export default TaskService;
