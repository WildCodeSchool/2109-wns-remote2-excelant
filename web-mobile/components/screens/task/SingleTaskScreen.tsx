import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../navigation/TaskNavigation";
import Task, { TaskType } from "../../task/Task";

type Props = StackScreenProps<StackParams, "SingleTask">;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
});

const SingleTaskScreen = ({ route }: Props) => {
  const TASK_QUERY = gql`
    query FindOneTask($input: FindOneTaskById!) {
      findOneTask(input: $input) {
        _id
        name
        project
        status
        assigne
        dueDate
      }
    }
  `;

  const { loader } = styles;

  const emptyTask: TaskType = {
    _id: "",
    name: "",
    project: "",
    status: "",
    assigne: "",
    dueDate: "",
  };

  const [taskData, setTaskData] = useState<TaskType>(emptyTask);
  const { loading, data, error } = useQuery(TASK_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        _id: route.params.id,
      },
    },
  });

  useEffect(() => {
    if (data) setTaskData(data.findOneTask);
  });

  if (loading)
    return <ActivityIndicator style={loader} size="large" color="lavender" />;
  if (error) return <Text>Error! {error.message}</Text>;
  return <Task item={taskData} />;
};

export default SingleTaskScreen;
