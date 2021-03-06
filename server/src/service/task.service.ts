import CreateTaskInput from '../schema/Task/task.create';
import FindOneTaskById from '../schema/Task/task.find';
import { TaskModel } from '../schema/index';
import UpdateTaskInput from '../schema/Task/task.update';
import DeleteTaskInput from '../schema/Task/task.delete';

class TaskService {
  // eslint-disable-next-line
  async findTasks() {
    const tasks = await TaskModel.find().populate('project').lean();
    return tasks;
  }

  // eslint-disable-next-line
  async findOne(input: FindOneTaskById) {
    const task = await TaskModel.findById(input);
    await task?.populate('project');
    return task;
  }

  // eslint-disable-next-line
  async createTask(input: CreateTaskInput) {
    const task = await TaskModel.create(input);
    await task.populate('project');
    return task;
  }

  // eslint-disable-next-line
  async updateTask(id: string, input: UpdateTaskInput) {
    const task = await TaskModel.findByIdAndUpdate(id, input);
    await task?.populate('project');
    return task;
  }

  // eslint-disable-next-line
  async deleteTask(input: DeleteTaskInput) {
    const task = await TaskModel.findByIdAndDelete(input._id);
    await task?.populate('project');
    return task;
  }
}

export default TaskService;
