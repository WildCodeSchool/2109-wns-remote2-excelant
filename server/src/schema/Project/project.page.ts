import { Field, Int, ObjectType } from 'type-graphql';
import Project from './project.schema';

@ObjectType()
class ProjectPage {
  @Field(() => [Project])
  docs: [Project];

  @Field(() => Int)
  totalDocs: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pagingCounter: number;

  @Field(() => Int)
  hasPrevPage: boolean;

  @Field(() => Int)
  hasNextPage: boolean;

  @Field(() => String)
  prevPage: string;

  @Field(() => String)
  nextPage: string;
}

export default ProjectPage;
