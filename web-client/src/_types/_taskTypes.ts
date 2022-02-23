export type TaskType = {
  _id: string;
  name: string;
  status: "InProgress" | "Completed" | "ToDo";
  project: string;
  assigne: string;
  dueDate: string;
};
