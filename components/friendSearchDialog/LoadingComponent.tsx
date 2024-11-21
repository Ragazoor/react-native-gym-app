import { CustomTheme } from "@/app/_layout";
import { ActivityIndicator, Surface, Text, useTheme } from "react-native-paper";

const FriendSearchDialog = () => {
  const { spacing } = useTheme<CustomTheme>();
  return (
    <>
      <Text
        variant="titleMedium"
        style={{ alignSelf: "center", marginBottom: spacing.medium }}
      >
        Loading users...
      </Text>
      <ActivityIndicator />
    </>
  );
};

export default FriendSearchDialog;
