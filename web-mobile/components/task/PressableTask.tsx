import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { StackParams } from "../navigation/TaskNavigation";
import Task, { TaskType } from "./Task";

const PressableTask: React.FC<{ item: TaskType }> = ({ item }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();

  return (
    <Pressable
      onPress={() => navigation.navigate("SingleTask", { id: item._id })}
    >
      <Task item={item} />
    </Pressable>
  );
};

export default PressableTask;
