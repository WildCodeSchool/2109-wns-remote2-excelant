import CreateProjectInput from '../schema/Project/project.create';
import { ProjectModel, TaskModel } from '../schema/index';
import UpdateProjectInput from '../schema/Project/project.update';
import DeleteProjectInput from '../schema/Project/project.delete';
import FindOneProjectInput from '../schema/Project/project.find';
import FindProjectByLimitAndPageInput from '../schema/Project/project.findpage';

class ProjectService {
  // eslint-disable-next-line
  async findProjects() {
    return ProjectModel.find().lean();
  }

  // eslint-disable-next-line
  async findProjectByLimitAndPage(input: FindProjectByLimitAndPageInput) {
    return ProjectModel.paginate({}, input);
  }

  // eslint-disable-next-line
  async findOneProject(input: FindOneProjectInput) {
    return ProjectModel.findOne(input);
  }

  // eslint-disable-next-line
  async createProject(input: CreateProjectInput) {
    return ProjectModel.create(input);
  }

  // eslint-disable-next-line
  async updateProject(id: string, input: UpdateProjectInput) {
    return ProjectModel.findByIdAndUpdate(id, input);
  }

  // eslint-disable-next-line
  async deleteProject(input: DeleteProjectInput) {
    const project = await ProjectModel.findByIdAndDelete(input._id);
    await TaskModel.deleteMany({ project: { _id: input._id } });
    return project;
  }
}

export default ProjectService;
