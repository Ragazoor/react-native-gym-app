import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import WorkoutFilterDialog from "./WorkoutFilterDialog";

const WorkoutFilterIcon = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setDialogVisible(true)}>
        <Ionicons name="options" size={30} color="#32a5f1" />
      </TouchableOpacity>

      {isDialogVisible && (
        <WorkoutFilterDialog
          visible={isDialogVisible}
          onClose={() => setDialogVisible(false)}
        />
      )}
    </View>
  );
};

export default WorkoutFilterIcon;
