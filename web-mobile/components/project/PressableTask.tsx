import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { StackParams } from "../navigation/ProjectNavigation";
import Project, { ProjectType } from "./Project";

const PressableProject: React.FC<{ item: ProjectType }> = ({ item }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate("SingleProject", { id: item._id })}
    >
      <Project item={item} />
    </Pressable>
  );
};

export default PressableProject;
