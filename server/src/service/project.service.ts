import CreateProjectInput from '../schema/project.create';
import { ProjectModel } from '../schema/project.schema';

class ProjectService {
  // eslint-disable-next-line
  async findProjects() {
    return ProjectModel.find().lean();
  }

  // eslint-disable-next-line
  async createProject(input: CreateProjectInput) {
    return ProjectModel.create(input);
  }
}

export default ProjectService;
