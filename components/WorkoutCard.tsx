import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Card, Text, Button, useTheme } from "react-native-paper";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "@/atoms/userAtom";
import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { useRemoveBooking } from "@/hooks/useRemoveBooking";
import { useCreateBooking } from "@/hooks/useCreateBooking";
import { Workout } from "@/models/workout";

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

  const { colors } = useTheme();
  const user = useAtomValue(userAtom);
  const [{ data: bookedWorkouts }] = useAtom(bookedWorkoutsAtom);

  const { isBooking, makeBooking } = useCreateBooking(user!.id, workout);
  const { isRemovingWorkout, removeBooking: removeWorkout } = useRemoveBooking(
    user!.id,
    workout
  );

  // Format time
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
    <Card style={styles.card} mode="elevated">
      <Card.Title
        title={workoutType.name}
        titleVariant="titleLarge"
        subtitle={extraTitle}
        titleStyle={{ color: colors.primary }}
      />
      <Card.Content>
        <Text variant="bodyMedium" style={styles.text}>
          {weekDay} {formattedStartTime} - {formattedEndTime}
        </Text>
        <Text
          variant="bodyMedium"
          style={[
            styles.text,
            {
              color: isFullyBooked ? colors.error : colors.onSurface,
            },
          ]}
        >
          {isFullyBooked ? "Fully Booked" : `Booked: ${bookingStatus}`}
        </Text>
        {numQueued > 0 && (
          <Text variant="bodySmall" style={styles.queue}>
            Queue: {numQueued}
          </Text>
        )}
      </Card.Content>
      <Card.Content
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Card.Content>
          <Text variant="bodyMedium" style={styles.staffTitle}>
            Staff:
          </Text>
          {staffs.map((staff) => (
            <Text key={staff.id} variant="bodySmall" style={styles.staffName}>
              {staff.firstName} {staff.lastName}
            </Text>
          ))}
        </Card.Content>
        {!isBooked && (
          <Button
            mode="contained"
            loading={isBooking}
            onPress={() => makeBooking()}
          >
            Boka
          </Button>
        )}
        {isBooked && (
          <Button
            mode="contained-tonal"
            buttonColor={colors.secondary}
            loading={isRemovingWorkout}
            onPress={() => removeWorkout()}
          >
            Avboka
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  text: {
    marginVertical: 4,
  },
  queue: {
    marginVertical: 4,
    color: "orange", // Adjust for theming if needed
  },
  staffTitle: {
    marginTop: 8,
    fontWeight: "bold",
  },
  staffName: {
    marginLeft: 8,
  },
  actions: {
    justifyContent: "flex-end",
    marginTop: 8,
  },
});

export default WorkoutCard;
