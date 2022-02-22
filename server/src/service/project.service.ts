import CreateProjectInput from '../schema/project.create';
import { ProjectModel } from '../schema/project.schema';
import DeleteProjectInput from '../schema/project.delete';

class ProjectService {
  // eslint-disable-next-line
  async findProjects() {
    return ProjectModel.find().lean();
  }

  // eslint-disable-next-line
  async createProject(input: CreateProjectInput) {
    return ProjectModel.create(input);
  }

  async deleteProject(input: DeleteProjectInput) {
    return ProjectModel.findByIdAndDelete(input._id)
  }
}

export default ProjectService;
