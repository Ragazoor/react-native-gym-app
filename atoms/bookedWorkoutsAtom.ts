import { fetchMyWorkouts } from "@/clients/fysikenClient";
import { BookedWorkout } from "@/models/bookedWorkout";
import { atomWithQuery } from "jotai-tanstack-query";

export const bookedWorkoutsAtom = atomWithQuery<BookedWorkout[]>(() => ({
  queryKey: ["bookedWorkouts"],
  queryFn: fetchMyWorkouts,
}));
