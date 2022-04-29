import React, { createContext } from "react";
import { ProjectType } from "../_types/_projectTypes";

interface ProjectsContextValue {
    projects: ProjectType[]
    setProjects: (data: any) => void
}

const projectsValues: ProjectsContextValue = {
    projects: [{
            _id: "",
            name: "",
            status: "InProgress" || "Completed" || "ToDo",
            projectManager: "",
            dueDate: "",
        }],
    setProjects: (data) => {}
}

const ProjectContext = createContext<ProjectsContextValue>(projectsValues);

export default ProjectContext;
