import { Mutation, Query, Arg } from 'type-graphql';
import CreateProjectInput from '../schema/project.create';
import Project from '../schema/project.schema';
import ProjectService from '../service/project.service';

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
}

export default ProjectResolver;
