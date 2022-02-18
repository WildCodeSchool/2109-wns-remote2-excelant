import React, { useState } from "react";
import { Text, Button, View, StyleSheet, Modal, TextInput } from "react-native";
import { gql, useMutation } from "@apollo/client";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonBox: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    margin: 5,
  },
  input: {
    borderWidth: 1,
    margin: 4,
    paddingLeft: 3,
  },
});

const CreateTaskScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [newTask, setNewTask] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const CREATE_TASK = gql`
    mutation createTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        name
        project
        status
        assigne
        dueDate
      }
    }
  `;
  const [createTask, { data, error }] = useMutation(CREATE_TASK);

  const onInputChange = (field: string) => {
    return (event: any) => {
      const task = { ...newTask };
      task[field] = event;
      setNewTask(task);
    };
  };

  const handleSubmit = () => {
    setLoading(true);
    try {
      createTask({ variables: { input: newTask } });
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a task</Text>
      <TextInput
        style={styles.input}
        onChangeText={onInputChange("name")}
        value={newTask.name}
        placeholder="Task Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onInputChange("project")}
        value={newTask.project}
        placeholder="Project Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={onInputChange("status")}
        value={newTask.status}
        placeholder="Status"
      />
      <TextInput
        style={styles.input}
        onChangeText={onInputChange("assigne")}
        value={newTask.assigne}
        placeholder="Assigne"
      />
      <TextInput
        style={styles.input}
        onChangeText={onInputChange("dueDate")}
        value={newTask.dueDate}
        placeholder="Due date"
      />
      <View style={styles.buttonBox}>
        <View style={styles.button}>
          <Button onPress={handleSubmit} title="Create" />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.goBack()}
            title="Cancel"
            color="red"
          />
        </View>
      </View>
    </View>
  );
};

export default CreateTaskScreen;
