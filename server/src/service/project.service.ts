import CreateProjectInput from '../schema/Project/project.create';
import { ProjectModel } from '../schema/index';
import UpdateProjectInput from '../schema/Project/project.update';
import DeleteProjectInput from '../schema/Project/project.delete';

class ProjectService {
  // eslint-disable-next-line
  async findProjects() {
    return ProjectModel.find().lean();
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
    return ProjectModel.findByIdAndDelete(input._id);
  }
}

export default ProjectService;
