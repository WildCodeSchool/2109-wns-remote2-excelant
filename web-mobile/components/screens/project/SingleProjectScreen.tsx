import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import type { StackScreenProps } from "@react-navigation/stack";
import { StackParams } from "../../navigation/TaskNavigation";
import Project, { ProjectType } from "../../project/Project";

type Props = StackScreenProps<StackParams, "SingleTask">;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
});

const SingleProjectScreen = ({ route }: Props) => {
  const PROJECT_QUERY = gql`
    query FindOneProject($input: FindOneProjectInput!) {
      findOneProject(input: $input) {
        _id
        name
        status
        projectManager
        dueDate
      }
    }
  `;

  const { loader } = styles;

  const emptyProject: ProjectType = {
    _id: "",
    name: "",
    status: "",
    projectManager: "",
    dueDate: "",
  };

  const [projectData, setProjectData] = useState<ProjectType>(emptyProject);
  const { loading, data, error } = useQuery(PROJECT_QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        _id: route.params.id,
      },
    },
  });

  useEffect(() => {
    if (data) setProjectData(data.findOneProject);
  }, [data]);

  if (loading)
    return <ActivityIndicator style={loader} size="large" color="lavender" />;
  if (error) return <Text>Error! {error.message}</Text>;
  return <Project item={projectData} />;
};

export default SingleProjectScreen;
