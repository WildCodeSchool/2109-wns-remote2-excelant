import { Mutation, Query, Arg } from 'type-graphql';
import CreateProjectInput from '../schema/Project/project.create';
import Project from '../schema/Project/project.schema';
import ProjectService from '../service/project.service';
import UpdateProjectInput from '../schema/Project/project.update';
import DeleteProjectInput from '../schema/Project/project.delete';

class ProjectResolver {
  constructor(private projectService: ProjectService) {
    this.projectService = new ProjectService();
  }

  @Query(() => [Project])
  findAllProjects() {
    return this.projectService.findProjects();
  }

  @Mutation(() => Project)
  createProject(@Arg('input') input: CreateProjectInput) {
    return this.projectService.createProject(input);
  }

  @Mutation(() => Project)
  updateProject(
    @Arg('_id') id: string,
    @Arg('input') input: UpdateProjectInput
  ) {
    return this.projectService.updateProject(id, input);
  }

  @Mutation(() => Project)
  deleteProject(@Arg('input') input: DeleteProjectInput) {
    return this.projectService.deleteProject(input);
  }
}

export default ProjectResolver;
