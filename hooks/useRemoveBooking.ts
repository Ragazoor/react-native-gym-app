import { bookedWorkoutsAtom } from "@/atoms/bookedWorkoutsAtom";
import { removeWorkout } from "@/clients/fysikenClient";
import { useAtom } from "jotai";
import { Alert } from "react-native";
import { useMutation } from "react-query";

export const useRemoveBooking = (userId: number, workoutId: number) => {
  const [{ refetch: refetchMyWorkouts }] = useAtom(bookedWorkoutsAtom);

  const { isLoading: isRemovingBooking, mutate: removeBooking } = useMutation<
    void,
    Error,
    void,
    unknown
  >("removeWorkout", () => removeWorkout(userId, workoutId), {
    onSuccess: () => {
      refetchMyWorkouts();
    },
    onError: (error) => {
      Alert.alert("Avbokning Misslyckades", error.message);
    },
  });

  return { isRemovingBooking, removeBooking };
};
