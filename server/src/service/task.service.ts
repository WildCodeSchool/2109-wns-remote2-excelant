import CreateTaskInput from '../schema/task.create';
import FindOneTaskById from '../schema/task.find';
import { TaskModel } from '../schema/task.schema';
import UpdateTaskInput from '../schema/task.update';
import DeleteTaskInput from '../schema/task.delete';

class TaskService {
  // eslint-disable-next-line
  async findTasks() {
    return TaskModel.find().lean();
  }

  // eslint-disable-next-line
  async findOne(input: FindOneTaskById) {
    return TaskModel.findById(input);
  }

  // eslint-disable-next-line
  async createTask(input: CreateTaskInput) {
    return TaskModel.create(input);
  }

  // eslint-disable-next-line
  async updateTask(id: string, input: UpdateTaskInput) {
    return TaskModel.findByIdAndUpdate(id, input);
  }

  // eslint-disable-next-line
  async deleteTask(input: DeleteTaskInput) {
    return TaskModel.findByIdAndDelete(input._id);
  }
}

export default TaskService;
