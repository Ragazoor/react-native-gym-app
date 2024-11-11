import {
  fetchWorkoutTypesAtom,
  workoutTypeFilterAtom,
} from "@/atoms/fetchWorkoutsAtom";
import { WorkoutType } from "@/models/workout";
import { useAtom, useAtomValue } from "jotai";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";

interface WorkoutFilterDialogProps {
  visible: boolean;
  onClose: () => void;
}

const WorkoutFilterDialog = ({
  visible,
  onClose,
}: WorkoutFilterDialogProps) => {
  const allWorkoutTypes = useAtomValue(fetchWorkoutTypesAtom);
  const [workoutTypeFilter, setWorkoutTypeFilter] = useAtom(
    workoutTypeFilterAtom
  );

  const toggleWorkoutType = (workoutType: WorkoutType) => {
    setWorkoutTypeFilter((prev) =>
      prev.map((wt) => wt.id).includes(workoutType.id)
        ? prev.filter((type) => type !== workoutType)
        : [...prev, workoutType]
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.dialog}
      >
        <Text style={styles.title}>Select Workout Types</Text>

        <FlatList
          data={allWorkoutTypes}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.workoutItem,
                workoutTypeFilter.includes(item) && styles.selectedItem,
              ]}
              onPress={() => toggleWorkoutType(item)}
            >
              <Text style={styles.workoutText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <Button onPress={onClose}>Close</Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  workoutItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  selectedItem: {
    backgroundColor: "#007bff",
  },
  workoutText: {
    fontSize: 16,
    color: "#333",
  },
});

export default WorkoutFilterDialog;
