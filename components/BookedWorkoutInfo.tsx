import { CustomTheme } from "@/app/_layout";
import { BookedWorkout } from "@/models/bookedWorkout";
import React from "react";
import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

interface BookedWorkoutInfoProps {
  workout: BookedWorkout;
}

const BookedWorkoutInfo: React.FC<BookedWorkoutInfoProps> = ({ workout }) => {
  const { spacing, colors } = useTheme<CustomTheme>();
  const {
    extraTitle,
    startTime,
    endTime,
    numBooked,
    numSpace,
    numQueued,
    workoutType,
    staffs,
    weekDay,
  } = workout;

  const formattedStartTime = new Date(startTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = new Date(endTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const bookingStatus = `${numBooked} / ${numSpace}`;
  const isFullyBooked = numBooked >= numSpace;

  return (
    <>
      <Card.Content>
        <Text
          variant="titleLarge"
          style={[styles.workoutType, { color: colors.primary }]}
        >
          {workoutType.name}
        </Text>
        <Text variant="titleMedium" style={styles.extraTitle}>
          {extraTitle}
        </Text>
        <Text variant="titleMedium" style={styles.time}>
          {weekDay} {formattedStartTime} - {formattedEndTime}
        </Text>
        <Text
          variant="titleMedium"
          style={[styles.bookingStatus, isFullyBooked && styles.fullBooking]}
        >
          {isFullyBooked ? "Fully Booked" : `Booked: ${bookingStatus}`}
        </Text>
        {numQueued > 0 && <Text style={styles.queue}>Queue: {numQueued}</Text>}
      </Card.Content>
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.small,
          marginTop: 2,
          marginBottom: 4,
        }}
      >
        <Text variant="titleMedium">Staff:</Text>
        {staffs.map((staff) => (
          <Text key={staff.id}>
            {staff.firstName} {staff.lastName}
          </Text>
        ))}
      </Card.Content>
    </>
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
  },
  noWorkoutsText: {
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  header: {},
  workoutType: {},
  extraTitle: {
    marginTop: 2,
  },
  details: {
    marginBottom: 10,
  },
  time: {},
  bookingStatus: {
    marginTop: 2,
  },
  fullBooking: {},
  queue: {
    marginTop: 2,
  },
  staffSection: {
    borderTopWidth: 1,
    paddingTop: 2,
  },
});

export default BookedWorkoutInfo;
