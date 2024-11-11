import React, { useState } from "react";
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import UserListItem from "./UserListItem";
import { Friend } from "@/models/friend";
import { userAtom } from "@/atoms/userAtom";
import { useAtom, useAtomValue } from "jotai";
import { firebaseUserAtom, friendListAtomQuery } from "@/atoms/friendsAtom";

interface FriendSearchDialogProps {
  visible: boolean;
  onClose: () => void;
}

const FriendSearchDialog = ({ visible, onClose }: FriendSearchDialogProps) => {
  const [searchText, setSearchText] = useState("");
  const allUsers = useAtomValue(firebaseUserAtom);
  const [filteredUsers, setFilteredUsers] = useState<Friend[]>(allUsers);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilteredUsers(
      allUsers.filter((user) =>
        user.userName.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.dialog}
      >
        <TextInput
          style={styles.searchInput}
          placeholder="Search for friends..."
          value={searchText}
          onChangeText={handleSearch}
        />

        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={({ item }) => <UserListItem user={item} />}
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
  searchInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});

export default FriendSearchDialog;
