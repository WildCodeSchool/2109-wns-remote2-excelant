export type ProjectType = {
  _id: string;
  name: string;
  status: "InProgress" | "Completed" | "ToDo";
  projectManager: Partial<{ _id: string; name: string; email: string }>;
  dueDate: string;
};
