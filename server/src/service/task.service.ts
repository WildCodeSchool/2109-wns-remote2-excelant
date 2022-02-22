import CreateTaskInput from '../schema/task.create';
import { FindOneTaskById } from '../schema/task.find';
import { TaskModel } from '../schema/task.schema';
import DeleteTaskInput from '../schema/task.delete';

class TaskService {
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

  async deleteTask(input: DeleteTaskInput) {
    return TaskModel.findByIdAndDelete(input._id);
  }
}

export default TaskService;
