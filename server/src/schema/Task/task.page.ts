import { Field, Int, ObjectType } from 'type-graphql';
import Task from './task.schema';

@ObjectType()
class TaskPage {
    @Field(() => [Task])
    docs: [Task];

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

export default TaskPage;