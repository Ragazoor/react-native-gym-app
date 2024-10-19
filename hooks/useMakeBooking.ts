import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { bookWorkout, removeWorkout } from "@/clients/fysikenClient";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { useMutation } from "react-query";

export const useMakeBooking = (userId: number, workoutId: number) => {
  const [{ refetch: refetchMyWorkouts }] = useAtom(bookedWorkoutsAtom);

  const { isLoading: isBooking, mutate: makeBooking } = useMutation<
    void,
    Error,
    void,
    unknown
  >("bookWorkout", () => bookWorkout(userId, workoutId), {
    onSuccess: () => {
      refetchMyWorkouts();
    },
    onError: (error) => {
      Alert.alert("Avbokning Misslyckades", error.message);
    },
  });

  return { isBooking, makeBooking };
};
