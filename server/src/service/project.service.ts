import CreateProjectInput from '../schema/project.create';
import { ProjectModel } from '../schema/project.schema';
import UpdateTaskInput from '../schema/task.update';
import UpdateProjectInput from "../schema/project.update";

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
}

export default ProjectService;
