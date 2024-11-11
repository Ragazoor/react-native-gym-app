import { isVenueSelectedAtom } from "@/atoms/filterVenuesAtom";
import { Venue, VenueName, Workout } from "@/models/workout";
import { useAtom } from "jotai";
import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface WorkoutCardProps {
  buttonVenueName: VenueName;
}

const VenueFilterButton: React.FC<WorkoutCardProps> = ({ buttonVenueName }) => {
  const [isActive, setIsActive] = useAtom(isVenueSelectedAtom(buttonVenueName));

  return (
    <TouchableOpacity
      style={[styles.venueButton, isActive && styles.activeButton]}
      onPress={() => setIsActive(!isActive)}
    >
      <Text style={styles.buttonText}>{buttonVenueName}</Text>
    </TouchableOpacity>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  filterContainer: {
    padding: 10,
    backgroundColor: "#000000",
    //alignItems: 'center',
  },
  buttonTitle: {
    alignSelf: "flex-start",
  },
  venueButton: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#007AFF", // Highlight the active button
  },
  buttonText: {
    color: "#fff",
  },
});

export default VenueFilterButton;
