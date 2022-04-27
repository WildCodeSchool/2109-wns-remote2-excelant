export type ProjectType = {
  _id: string;
  name: string;
  status: "InProgress" | "Completed" | "ToDo";
  projectManager: string;
  dueDate: string;
};
