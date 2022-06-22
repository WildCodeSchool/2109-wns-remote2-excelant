import React, { createContext } from 'react';
import { TaskType } from "../_types/_taskTypes";

interface TaskContextValue {
    tasks: TaskType[]
    setTasks: (data: any) => void
}

const tasksValues: TaskContextValue = {
    tasks: [{
        _id: "",
        name: "",
        status: "InProgress" || "Completed" || "ToDo",
        project: {},
        assigne: "",
        dueDate: "",
    }],
    setTasks: (data) => {}
}

const TaskContext = createContext<TaskContextValue>(tasksValues);

export default TaskContext;
