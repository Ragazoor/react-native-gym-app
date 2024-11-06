import { fetchMyWorkouts } from "@/clients/gymClient";
import { BookedWorkout } from "@/models/bookedWorkout";
import { atomWithQuery } from "jotai-tanstack-query";

export const bookedWorkoutsAtom = atomWithQuery<BookedWorkout[]>(() => ({
  queryKey: ["bookedWorkouts"],
  queryFn: fetchMyWorkouts,
}));
