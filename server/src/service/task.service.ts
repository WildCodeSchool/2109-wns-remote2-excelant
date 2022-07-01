import CreateTaskInput from '../schema/Task/task.create';
import FindOneTaskById from '../schema/Task/task.find';
import { TaskModel } from '../schema/index';
import UpdateTaskInput from '../schema/Task/task.update';
import DeleteTaskInput from '../schema/Task/task.delete';
import FindTaskByLimitAndPageInput from '../schema/Task/task.findpage';

class TaskService {
  // eslint-disable-next-line
  async findTasks() {
    const tasks = await TaskModel.find()
      .populate('project')
      .populate({
        path: 'assigne',
        select: '_id, name',
      })
      .lean();
    return tasks;
  }

  // eslint-disable-next-line
  async findTaskByLimitAndPage(input: FindTaskByLimitAndPageInput) {
    return TaskModel.paginate(
      {},
      {
        ...input,
        populate: [
          {
            path: 'project',
            select: '_id, name',
          },
          {
            path: 'assigne',
            select: '_id, name',
          },
        ],
      }
    );
  }

  // eslint-disable-next-line
  async findOne(input: FindOneTaskById) {
    const task = await TaskModel.findById(input);
    await task?.populate('project');
    await task?.populate({
      path: 'assigne',
      select: '_id, name',
    });
    return task;
  }

  // eslint-disable-next-line
  async createTask(input: CreateTaskInput) {
    const task = await TaskModel.create(input);
    await task.populate('project');
    await task.populate({
      path: 'assigne',
      select: '_id, name',
    });
    return task;
  }

  // eslint-disable-next-line
  async updateTask(id: string, input: UpdateTaskInput) {
    const task = await TaskModel.findByIdAndUpdate(id, input, { new: true });
    await task?.populate('project');
    await task?.populate({
      path: 'assigne',
      select: '_id, name',
    });
    return task;
  }

  // eslint-disable-next-line
  async deleteTask(input: DeleteTaskInput) {
    const task = await TaskModel.findByIdAndDelete(input._id);
    await task?.populate('project');
    await task?.populate({
      path: 'assigne',
      select: '_id, name',
    });
    return task;
  }
}

export default TaskService;
