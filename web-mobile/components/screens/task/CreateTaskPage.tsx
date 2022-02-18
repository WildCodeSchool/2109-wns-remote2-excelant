import React, { useState } from "react";
import { Text, Button, View, StyleSheet, Modal } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

const CreateTaskScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a task</Text>
      {/* <Button onPress={} title="Create" />
      <Button onPress={} title="Cancel" /> */}
    </View>
  );
};

export default CreateTaskScreen;
