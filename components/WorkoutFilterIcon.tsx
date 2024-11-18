import React, { useState } from "react";
import { IconButton, Dialog, Portal, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import WorkoutFilterDialog from "./WorkoutFilterDialog";

const WorkoutFilterIcon = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const { colors } = useTheme(); // Access theme for consistent styling

  return (
    <>
      <IconButton
        icon={() => (
          <Ionicons name="options" size={30} color={colors.primary} />
        )}
        onPress={() => setDialogVisible(true)}
      />

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setDialogVisible(false)}
        >
          <WorkoutFilterDialog
            visible={isDialogVisible}
            onClose={() => setDialogVisible(false)}
          />
        </Dialog>
      </Portal>
    </>
  );
};

export default WorkoutFilterIcon;
