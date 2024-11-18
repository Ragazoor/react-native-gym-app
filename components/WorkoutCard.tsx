import { Workout } from "@/models/workout";
import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { useRemoveBooking } from "@/hooks/useRemoveBooking";
import { useCreateBooking } from "@/hooks/useCreateBooking";

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  const {
    id: workoutId,
    duration,
    startTime,
    endTime,
    numBooked,
    numSpace,
    numQueued,
    workoutType,
    staffs,
    venue,
    weekDay,
  } = workout;

  const user = useAtomValue(userAtom);
  const [{ data: bookedWorkouts }] = useAtom(bookedWorkoutsAtom);

  const { isBooking, makeBooking } = useCreateBooking(user!.id, workout);

  const { isRemovingWorkout, removeBooking: removeWorkout } = useRemoveBooking(
    user!.id,
    workout
  );

  // Format time (you can customize based on your requirement)
  const formattedStartTime = startTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedEndTime = endTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Booking status calculation
  const bookingStatus = `${numBooked} / ${numSpace}`;
  const isFullyBooked = numBooked >= numSpace;

  const extraTitle = `${duration ? duration : ""}${
    venue ? "  " + venue.name : ""
  }`;

  const isBooked = useMemo(
    () =>
      bookedWorkouts
        ? bookedWorkouts.some((bookedWorkout) => bookedWorkout.id === workoutId)
        : false,
    [bookedWorkouts, workoutId]
  );

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.workoutType}>{workoutType.name}</Text>
        <Text style={styles.extraTitle}>{extraTitle}</Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.time}>
          {weekDay} {formattedStartTime} - {formattedEndTime}
        </Text>
        <Text
          style={[styles.bookingStatus, isFullyBooked && styles.fullBooking]}
        >
          {isFullyBooked ? "Fully Booked" : `Booked: ${bookingStatus}`}
        </Text>
        {numQueued > 0 && <Text style={styles.queue}>Queue: {numQueued}</Text>}
      </View>

      <View style={styles.staffSection}>
        <View>
          <Text style={styles.staffTitle}>Staff:</Text>
          {staffs.map((staff) => (
            <Text key={staff.id} style={styles.staffName}>
              {staff.firstName} {staff.lastName}
            </Text>
          ))}
        </View>
        {!isBooked && (
          <Button
            title="Boka"
            disabled={isBooking}
            onPress={() => makeBooking()}
          />
        )}
        {isBooked && (
          <Button
            title="Avboka"
            color={"red"}
            disabled={isRemovingWorkout}
            onPress={() => removeWorkout()}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
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
    flexDirection: "row",
    justifyContent: "space-evenly",
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

export default WorkoutCard;
