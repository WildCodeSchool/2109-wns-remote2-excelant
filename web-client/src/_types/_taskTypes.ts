import { ProjectType } from "./_projectTypes";

export type TaskType = {
  _id: string;
  name: string;
  status: "InProgress" | "Completed" | "ToDo";
  project: Partial<ProjectType>;
  assigne: { _id: string; name: string };
  dueDate: string;
  description: string;
};
