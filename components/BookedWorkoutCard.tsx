import { userAtom } from "@/atoms/userAtom";
import { useRemoveBooking } from "@/hooks/useRemoveBooking";
import { BookedWorkout } from "@/models/bookedWorkout";
import { useAtomValue } from "jotai";
import React from "react";
import { StyleSheet } from "react-native";
import BookedWorkoutInfo from "./BookedWorkoutInfo";
import { Card, useTheme, Button } from "react-native-paper";
import { CustomTheme } from "@/app/_layout";

interface BookedWorkoutCardProps {
  workout: BookedWorkout;
}

const BookedWorkoutCard: React.FC<BookedWorkoutCardProps> = ({ workout }) => {
  const user = useAtomValue(userAtom);
  const { spacing } = useTheme<CustomTheme>();
  const { isRemovingWorkout, removeBooking } = useRemoveBooking(
    user!.id,
    workout
  );

  return (
    <Card
      style={{
        padding: spacing.medium,
        marginBottom: spacing.medium,
      }}
      mode="elevated"
    >
      <BookedWorkoutInfo workout={workout} />
      <Button
        mode="contained"
        disabled={isRemovingWorkout}
        onPress={() => removeBooking()}
      >
        Cancel Booking
      </Button>
    </Card>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  noWorkoutsText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  card: {},
  header: {
    marginBottom: 10,
  },
  workoutType: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  extraTitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 2,
  },
  details: {
    marginBottom: 10,
  },
  time: {
    fontSize: 16,
    color: "#666",
  },
  bookingStatus: {
    fontSize: 16,
    marginTop: 5,
    color: "#007AFF",
  },
  fullBooking: {
    color: "#FF3B30",
  },
  queue: {
    fontSize: 14,
    color: "#FFA500",
    marginTop: 3,
  },
  staffSection: {
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  staffTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  staffName: {
    fontSize: 14,
    color: "#555",
  },
});

export default BookedWorkoutCard;
