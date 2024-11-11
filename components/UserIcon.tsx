import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import FriendSearchDialog from "./FriendSearchDialog";

const UserIcon = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setDialogVisible(true)}>
        <Ionicons name="person-add" size={30} color="#32a5f1" />
      </TouchableOpacity>

      {isDialogVisible && (
        <FriendSearchDialog
          visible={isDialogVisible}
          onClose={() => setDialogVisible(false)}
        />
      )}
    </View>
  );
};

export default UserIcon;
