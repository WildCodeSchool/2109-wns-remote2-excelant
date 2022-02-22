import CreateTaskInput from '../schema/task.create';
import { TaskModel } from '../schema/task.schema';
import DeleteTaskInput from '../schema/task.delete';

class TaskService {
  async findTasks() {
    return TaskModel.find().lean();
  }

  async createTask(input: CreateTaskInput) {
    return TaskModel.create(input);
  }

  async deleteTask(input: DeleteTaskInput) {
    return TaskModel.findByIdAndDelete(input._id);
  }
}

export default TaskService;
