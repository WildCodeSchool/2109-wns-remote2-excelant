import CreateProjectInput from '../schema/Project/project.create';
import { ProjectModel, TaskModel } from '../schema/index';
import UpdateProjectInput from '../schema/Project/project.update';
import DeleteProjectInput from '../schema/Project/project.delete';
import FindOneProjectInput from '../schema/Project/project.find';
import FindProjectByLimitAndPageInput from '../schema/Project/project.findpage';

class ProjectService {
  // eslint-disable-next-line
  async findProjects() {
    return ProjectModel.find()
      .populate({
        path: 'projectManager',
        select: '_id, name',
      })
      .lean();
  }

  // eslint-disable-next-line
  async findProjectByLimitAndPage(input: FindProjectByLimitAndPageInput) {
    const projects = await ProjectModel.paginate(
      {},
      {
        ...input,
        populate: {
          path: 'projectManager',
          select: '_id, name',
        },
      }
    );
    return projects;
  }

  // eslint-disable-next-line
  async findOneProject(input: FindOneProjectInput) {
    return ProjectModel.findOne(input).populate({
      path: 'projectManager',
      select: '_id, name',
    });
  }

  // eslint-disable-next-line
  async createProject(input: CreateProjectInput) {
    const project = await ProjectModel.create(input);
    await project.populate({
      path: 'projectManager',
      select: '_id, name',
    });
    return project;
  }

  // eslint-disable-next-line
  async updateProject(id: string, input: UpdateProjectInput) {
    return ProjectModel.findByIdAndUpdate(id, input, { new: true }).populate({
      path: 'projectManager',
      select: '_id, name',
    });
  }

  // eslint-disable-next-line
  async deleteProject(input: DeleteProjectInput) {
    const project = await ProjectModel.findByIdAndDelete(input._id).orFail(() =>
      Error('Not found')
    );
    await TaskModel.deleteMany({ project: { _id: input._id } });
    await project.populate({
      path: 'projectManager',
      select: '_id, name',
    });
    return project;
  }
}

export default ProjectService;
