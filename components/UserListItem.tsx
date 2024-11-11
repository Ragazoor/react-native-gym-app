import { friendListAtomQuery } from "@/atoms/friendsAtom";
import { addFriend, removeFriend } from "@/clients/firebaseClient";
import { Friend } from "@/models/friend";
import { isLoaded } from "expo-font";
import { useAtom } from "jotai";
import React, { useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useMutation } from "react-query";

interface UserListItemProps {
  user: Friend;
}

const UserListItem = ({ user }: UserListItemProps) => {
  const [{ data: friendList, refetch: refetchFriends }] =
    useAtom(friendListAtomQuery);

  const { mutate: addNewFriend, isLoading: isAddingFriend } = useMutation<
    void,
    Error,
    Friend,
    unknown
  >("addFriend", async (newFriend) => {
    await addFriend(newFriend);
    refetchFriends();
  });

  const { mutate: doRemoveFriend, isLoading: isRemovingFriend } = useMutation<
    void,
    Error,
    Friend,
    unknown
  >("removeFriend", async (friend) => {
    await removeFriend(friend);
    refetchFriends();
  });

  if (!friendList) {
    return null;
  }

  const isFriend = useMemo(
    () => friendList.some((friend) => friend.userId === user.userId),
    [friendList, user.userId]
  );

  const handleAddFriend = () => {
    if (isFriend) {
      doRemoveFriend(user);
    } else {
      addNewFriend(user);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{user.userName}</Text>
      <TouchableOpacity
        style={[styles.button, isFriend && styles.buttonAdded]}
        onPress={handleAddFriend}
        disabled={isAddingFriend || isRemovingFriend}
      >
        <Text style={styles.buttonText}>
          {isFriend ? "Remove" : "Add Friend"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  username: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 5,
    borderRadius: 5,
  },
  buttonAdded: {
    backgroundColor: "#9b1717",
  },
  buttonText: {
    color: "white",
  },
});

export default UserListItem;
