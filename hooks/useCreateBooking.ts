import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { bookWorkout } from "@/clients/fysikenClient";
import { createCalendarEvent } from "@/clients/googleClient";
import { buildGoogleEvent } from "@/models/createGoogleEventDto";
import { BaseWorkout, Workout } from "@/models/workout";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { useMutation } from "react-query";
import { useCreateGoogleEvent } from "./useCreateGoogleEvent";

export const useCreateBooking = (userId: number, workout: BaseWorkout) => {
  const [{ refetch: refetchMyWorkouts }] = useAtom(bookedWorkoutsAtom);

  const { isCreatingCalendarEvent, doCreateCalendarEvent } =
    useCreateGoogleEvent(workout);
  const { isLoading: isBooking, mutate: makeBooking } = useMutation<
    void,
    Error,
    void,
    unknown
  >("bookWorkout", () => bookWorkout(userId, workout.id), {
    onSuccess: () => {
      doCreateCalendarEvent();
      refetchMyWorkouts();
    },
    onError: (error) => {
      Alert.alert("Bokning Misslyckades", error.message);
    },
  });

  return { isBooking: isBooking || isCreatingCalendarEvent, makeBooking };
};
