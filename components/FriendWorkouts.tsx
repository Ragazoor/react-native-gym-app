import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { List, Text, useTheme } from "react-native-paper";
import { useAtom } from "jotai";
import FriendWorkoutCard from "@/components/FriendWorkoutCard";
import { friendsWorkoutsAtom } from "@/atoms/friendsAtom";
import { FriendWorkout } from "@/models/friend";
import { CustomTheme } from "@/app/_layout";

export default function FriendWorkouts() {
  const [expandedFriend, setExpandedFriend] = useState<string | undefined>(
    undefined
  );
  const [{ data: friendsWorkoutData }] = useAtom(friendsWorkoutsAtom);
  const { colors, spacing, fonts } = useTheme<CustomTheme>();

  const toggleFriendWorkouts = (friendId: string) => {
    setExpandedFriend(expandedFriend === friendId ? undefined : friendId);
  };

  const renderFriend = ({ item: friend }: { item: FriendWorkout }) => (
    <List.Accordion
      title={friend.userName}
      titleStyle={styles.friendName}
      expanded={expandedFriend === friend.userId}
      onPress={() => toggleFriendWorkouts(friend.userId)}
      left={(props) => <List.Icon {...props} icon="account" />}
    >
      {friend.workouts.map((workout) => (
        <FriendWorkoutCard workout={workout} key={workout.id} />
      ))}
    </List.Accordion>
  );

  return friendsWorkoutData && friendsWorkoutData.length > 0 ? (
    <FlatList
      data={friendsWorkoutData}
      keyExtractor={(item) => item.userId.toString()}
      renderItem={renderFriend}
      contentContainerStyle={styles.container}
    />
  ) : (
    <Text
      variant="titleMedium"
      style={[
        {
          marginTop: spacing.large,
          textAlign: "center",
        },
        { color: colors.primary },
      ]}
    >
      {"You don't have any friends? :("}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noWorkoutsText: {},
});
