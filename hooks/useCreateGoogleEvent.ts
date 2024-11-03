import { createCalendarEvent } from "@/clients/googleClient";
import { buildGoogleEvent } from "@/models/createGoogleEventDto";
import { BaseWorkout } from "@/models/workout";
import { Alert } from "react-native";
import { useMutation } from "react-query";

export const useCreateGoogleEvent = (workout: BaseWorkout) => {
  const workoutEvent = buildGoogleEvent(workout);

  const { isLoading: isCreatingCalendarEvent, mutate: doCreateCalendarEvent } =
    useMutation<void, Error, void, unknown>(
      "createCalendarEvent",
      () => createCalendarEvent(workoutEvent),
      {
        onError: (error) => {
          Alert.alert("Lyckades inte ta bort kalender event", error.message);
        },
      }
    );

  return { isCreatingCalendarEvent, doCreateCalendarEvent };
};
