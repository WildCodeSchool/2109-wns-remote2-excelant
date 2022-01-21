import { gql } from "@apollo/client";


const TASKS_QUERY = gql`
    query {
        findAllTasks {
            _id
            name
            project
            status
            assigne
            dueDate
        }
    }
`;

export default TASKS_QUERY;