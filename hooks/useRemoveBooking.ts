import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { removeWorkout } from "@/clients/gymClient";
import { BaseWorkout } from "@/models/workout";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { useMutation, useQuery } from "react-query";
import { useRemoveGoogleEvent } from "./useRemoveGoogleEvent";
import { useUpdateFirebaseCookie } from "./useUpdateFirebaseCookie";

export const useRemoveBooking = (userId: number, workout: BaseWorkout) => {
  const [{ refetch: refetchMyWorkouts }] = useAtom(bookedWorkoutsAtom);
  const { isRemovingCalendarEvent, doRemoveCalendarEvent } =
    useRemoveGoogleEvent(workout);
  const { isUpdatingCookie, doUpdateCookie } = useUpdateFirebaseCookie();

  const { isLoading: isRemovingWorkout, mutate: removeWorkoutBooking } =
    useMutation<void, Error, void, unknown>(
      "removeWorkout",
      () => removeWorkout(userId, workout.id),
      {
        onSuccess: () => {
          doUpdateCookie();
          doRemoveCalendarEvent();
          refetchMyWorkouts();
        },
        onError: (error) => {
          Alert.alert("Failed to remove booking", error.message);
        },
      }
    );

  return {
    isRemovingWorkout:
      isRemovingWorkout || isRemovingCalendarEvent || isUpdatingCookie,
    removeBooking: removeWorkoutBooking,
  };
};
