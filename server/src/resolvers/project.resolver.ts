import { Mutation, Query, Arg } from 'type-graphql';
import CreateProjectInput from '../schema/project.create';
import Project from '../schema/project.schema';
import ProjectService from '../service/project.service';
import DeleteProjectInput from '../schema/project.delete';

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
  deleteProject(@Arg('input') input: DeleteProjectInput) {
    return this.projectService.deleteProject(input);
  }
}

export default ProjectResolver;
