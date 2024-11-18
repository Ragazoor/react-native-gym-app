import FriendWorkouts from "@/components/FriendWorkouts";
import UserIcon from "@/components/UserIcon";
import { Surface, useTheme, Text } from "react-native-paper";
import { CustomTheme } from "../_layout";

export default function FriendsScreen() {
  const { spacing } = useTheme<CustomTheme>();
  return (
    <>
      <Surface
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.medium,
          marginTop: spacing.large,
        }}
      >
        <Text variant="headlineLarge">Kompisar</Text>
        <UserIcon />
      </Surface>
      <FriendWorkouts />
    </>
  );
}
