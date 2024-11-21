import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Modal, Portal, Button } from "react-native-paper";
import { Friend } from "@/models/friend";
import firestore from "@react-native-firebase/firestore";
import UserListComponent from "./UserListComponent";
import { useSetAtom } from "jotai";
import { allUsersAtom } from "./atoms";
import LoadingComponent from "./LoadingComponent";

interface FriendSearchDialogProps {
  visible: boolean;
  onClose: () => void;
}

const FriendSearchDialog = ({ visible, onClose }: FriendSearchDialogProps) => {
  const setUsers = useSetAtom(allUsersAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .onSnapshot((querySnapshot) => {
        const users: Friend[] = [];

        querySnapshot.forEach((documentSnapshot) => {
          const document = documentSnapshot.data();

          users.push({
            userId: documentSnapshot.id,
            userName: document.name,
          });
        });

        setUsers(users);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.dialog}
      >
        {loading && <LoadingComponent />}
        {!loading && <UserListComponent />}
        <Button onPress={onClose}>Close</Button>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
  },
});

export default FriendSearchDialog;
