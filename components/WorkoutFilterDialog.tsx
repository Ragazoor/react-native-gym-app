import { CustomTheme } from "@/app/_layout";
import { fetchWorkoutTypesAtom } from "@/atoms/fetchWorkoutsAtom";
import { workoutTypeFilterAtom } from "@/atoms/workoutTypeFilterAtom";
import { WorkoutType } from "@/models/workout";
import { useAtom, useAtomValue } from "jotai";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, TouchableOpacity } from "react-native";
import { Modal, Portal, Button, useTheme } from "react-native-paper";

interface WorkoutFilterDialogProps {
  visible: boolean;
  onClose: () => void;
}

const WorkoutFilterDialog = ({
  visible,
  onClose,
}: WorkoutFilterDialogProps) => {
  const { spacing } = useTheme<CustomTheme>();
  const allWorkoutTypes = useAtomValue(fetchWorkoutTypesAtom);
  const [workoutTypeFilter, setWorkoutTypeFilter] = useAtom(
    workoutTypeFilterAtom
  );

  const toggleWorkoutType = (workoutType: WorkoutType) => {
    setWorkoutTypeFilter(async (prev) => {
      const prevFilters = await prev;
      const workoutTypeIsInFilter = prevFilters
        .map((wt) => wt.name)
        .includes(workoutType.name);

      return workoutTypeIsInFilter
        ? prevFilters.filter((type) => type.name !== workoutType.name)
        : [...prevFilters, workoutType];
    });
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
                workoutTypeFilter.map((wt) => wt.name).includes(item.name) &&
                  styles.selectedItem,
              ]}
              onPress={() => toggleWorkoutType(item)}
            >
              <Text style={styles.workoutText}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />

        <Button
          mode="outlined"
          onPress={onClose}
          style={{ marginTop: spacing.medium }}
        >
          Close
        </Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 100,
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
