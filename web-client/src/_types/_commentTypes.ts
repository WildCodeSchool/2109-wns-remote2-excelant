import { UserType } from "./_userTypes";
import { TaskType } from "./_taskTypes";

export type CommentType = {
    _id: string;
    content: string;
    author: Partial<UserType>;
    task: Partial<TaskType>;
    date: string;
};