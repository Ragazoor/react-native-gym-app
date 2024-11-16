import { StyleSheet, TouchableOpacity, Text, FlatList } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { FriendWorkout } from "@/models/friend";
import { useAtom } from "jotai";
import { friendsWorkoutsAtom } from "@/atoms/friendsAtom";
import FriendWorkoutCard from "./FriendWorkoutCard";

export default function FriendWorkouts() {
  const [expandedFriend, setExpandedFriend] = useState<string | undefined>(
    undefined
  );
  const [{ data: friendsWorkoutData }] = useAtom(friendsWorkoutsAtom);

  const toggleFriendWorkouts = (friendId: string) => {
    setExpandedFriend(expandedFriend === friendId ? undefined : friendId);
  };

  const renderFriend = ({ item: friend }: { item: FriendWorkout }) => (
    <ThemedView style={styles.friendContainer} key={friend.userId}>
      <TouchableOpacity onPress={() => toggleFriendWorkouts(friend.userId)}>
        <ThemedText style={styles.friendName}>{friend.userName}</ThemedText>
      </TouchableOpacity>
      {expandedFriend === friend.userId &&
        friend.workouts.map((workout) => (
          <FriendWorkoutCard workout={workout} key={workout.id} />
        ))}
    </ThemedView>
  );

  return (
    <>
      {friendsWorkoutData && friendsWorkoutData.length > 0 ? (
        <FlatList
          data={friendsWorkoutData}
          keyExtractor={(item) => item.userId.toString()}
          renderItem={renderFriend}
          contentContainerStyle={styles.container}
        />
      ) : (
        <ThemedText style={styles.noWorkoutsText}>
          No booked workouts
        </ThemedText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  friendContainer: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#a0a0a0",
    borderRadius: 8,
  },
  friendName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  workoutContainer: {
    marginTop: 8,
    paddingLeft: 16,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 6,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  noWorkoutsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
});
