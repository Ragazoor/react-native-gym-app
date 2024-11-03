import {
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { BookedWorkout } from "@/models/bookedWorkout";
import { FriendWorkout } from "@/models/friend";
import { useAtom } from "jotai";
import { friendsAtom } from "@/atoms/friendsAtom";

export default function FriendWorkouts() {
  const [expandedFriend, setExpandedFriend] = useState<number | undefined>(
    undefined
  );
  const [{ data: friendsData }] = useAtom(friendsAtom);

  const toggleFriendWorkouts = (friendId: number) => {
    setExpandedFriend(expandedFriend === friendId ? undefined : friendId);
  };

  const renderWorkout = (workout: BookedWorkout) => (
    <ThemedView style={styles.workoutContainer} key={workout.id}>
      <Text style={styles.workoutTitle}>{workout.extraTitle}</Text>
      <Text>{`Type: ${workout.workoutType.name}`}</Text>
      <Text>{`Start: ${workout.startTime.toLocaleTimeString()}`}</Text>
      <Text>{`End: ${workout.endTime.toLocaleTimeString()}`}</Text>
      <Text>{`Spaces: ${workout.numBooked}/${workout.numSpace}`}</Text>
    </ThemedView>
  );

  const renderFriend = ({ item: friend }: { item: FriendWorkout }) => (
    <ThemedView style={styles.friendContainer}>
      <TouchableOpacity onPress={() => toggleFriendWorkouts(friend.id)}>
        <ThemedText style={styles.friendName}>{friend.name}</ThemedText>
      </TouchableOpacity>
      {expandedFriend === friend.id &&
        friend.workouts.map((workout) => renderWorkout(workout))}
    </ThemedView>
  );

  return (
    <>
      {friendsData && friendsData.length > 0 ? (
        <FlatList
          data={friendsData}
          keyExtractor={(item) => item.id.toString()}
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
