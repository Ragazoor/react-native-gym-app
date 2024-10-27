import {
  getWorkoutClendarEvent,
  removeCalendarEvent,
} from "@/clients/googleClient";
import { BaseWorkout } from "@/models/workout";
import { Alert } from "react-native";
import { useMutation } from "react-query";

const attemptRemoveCalendarEvent = async (
  workout: BaseWorkout
): Promise<void> => {
  const calendarEvent = await getWorkoutClendarEvent(
    workout.startTime,
    workout.endTime,
    workout.workoutType.name
  );

  await removeCalendarEvent(calendarEvent.id);
  return;
};

export const useRemoveGoogleEvent = (workout: BaseWorkout) => {
  const { isLoading: isRemovingCalendarEvent, mutate: doRemoveCalendarEvent } =
    useMutation<void, Error, void, unknown>(
      "removeCalendarEvent",
      () => attemptRemoveCalendarEvent(workout),
      {
        onError: (error) => {
          Alert.alert("Lyckades inte ta bort kalender event", error.message);
        },
      }
    );

  return { isRemovingCalendarEvent, doRemoveCalendarEvent };
};
