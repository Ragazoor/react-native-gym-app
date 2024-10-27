import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { removeWorkout } from "@/clients/fysikenClient";
import { BaseWorkout } from "@/models/workout";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useRemoveGoogleEvent } from "./useRemoveGoogleEvent";

export const useRemoveBooking = (userId: number, workout: BaseWorkout) => {
  const [{ refetch: refetchMyWorkouts }] = useAtom(bookedWorkoutsAtom);
  const { isRemovingCalendarEvent, doRemoveCalendarEvent } =
    useRemoveGoogleEvent(workout);

  const { isLoading: isRemovingWorkout, mutate: removeWorkoutBooking } =
    useMutation<void, Error, void, unknown>(
      "removeWorkout",
      () => removeWorkout(userId, workout.id),
      {
        onSuccess: () => {
          doRemoveCalendarEvent();
          refetchMyWorkouts();
        },
        onError: (error) => {
          Alert.alert("Avbokning Misslyckades", error.message);
        },
      }
    );

  return {
    isRemovingWorkout: isRemovingWorkout || isRemovingCalendarEvent,
    removeBooking: removeWorkoutBooking,
  };
};
