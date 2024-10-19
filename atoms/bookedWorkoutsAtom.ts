import { fetchMyWorkouts } from "@/clients/fysikenClient";
import { BookedWorkout } from "@/models/myWorkout";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { useQuery } from "react-query";

export const bookedWorkoutsAtom = atomWithQuery<BookedWorkout[]>(() => ({
  queryKey: ["bookedWorkouts"],
  queryFn: fetchMyWorkouts,
}));
