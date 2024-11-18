import React from "react";
import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";
import { useAtom } from "jotai";
import { VenueName } from "@/models/workout";
import { isVenueSelectedAtom } from "@/atoms/filterVenuesAtom";

interface WorkoutCardProps {
  buttonVenueName: VenueName;
}

const VenueFilterButton: React.FC<WorkoutCardProps> = ({ buttonVenueName }) => {
  const [isActive, setIsActive] = useAtom(isVenueSelectedAtom(buttonVenueName));
  const theme = useTheme();

  return (
    <Button
      mode={isActive ? "contained" : "outlined"}
      onPress={() => setIsActive(!isActive)}
      style={[
        styles.button,
        isActive && { backgroundColor: theme.colors.primary },
      ]}
      labelStyle={[
        styles.buttonText,
        isActive && { color: theme.colors.onPrimary },
      ]}
    >
      {buttonVenueName}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default VenueFilterButton;
