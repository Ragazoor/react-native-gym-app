import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { bookWorkout } from "@/clients/fysikenClient";
import { createCalendarEvent } from "@/clients/googleClient";
import { buildGoogleEvent } from "@/models/createGoogleEventDto";
import { BaseWorkout, Workout } from "@/models/workout";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { useMutation } from "react-query";

export const useCreateBooking = (userId: number, workout: BaseWorkout) => {
  const [{ refetch: refetchMyWorkouts }] = useAtom(bookedWorkoutsAtom);

  const workoutEvent = buildGoogleEvent(workout);
  const { isLoading: isBooking, mutate: makeBooking } = useMutation<
    void,
    Error,
    void,
    unknown
  >("bookWorkout", () => bookWorkout(userId, workout.id), {
    onSuccess: () => {
      createCalendarEvent(workoutEvent);
      refetchMyWorkouts();
    },
    onError: (error) => {
      Alert.alert("Bokning Misslyckades", error.message);
    },
  });

  return { isBooking, makeBooking };
};
