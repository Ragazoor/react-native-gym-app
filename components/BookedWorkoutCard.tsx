import { userAtom } from "@/atoms/userAtom";
import { useRemoveBooking } from "@/hooks/useRemoveBooking";
import { BookedWorkout } from "@/models/bookedWorkout";
import { useAtomValue } from "jotai";
import React from "react";
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

export default BookedWorkoutCard;
