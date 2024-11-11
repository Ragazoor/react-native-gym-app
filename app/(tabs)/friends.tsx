import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";
import FriendWorkouts from "@/components/FriendWorkouts";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import UserIcon from "@/components/UserIcon";

export default function FriendsScreen() {
  return (
    <SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Kompisar</ThemedText>
        <UserIcon />
      </ThemedView>
      <FriendWorkouts />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 52,
  },
});
