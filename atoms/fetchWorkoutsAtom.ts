import { fetchWorkouts } from "@/clients/gymClient";
import { Workout, WorkoutType } from "@/models/workout";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

function getInitStartDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

export const fetchWorkoutsStartDateAtom = atom<Date>(getInitStartDate());

function getInitEndDate(): Date {
  const date = new Date();
  date.setDate(date.getDate() + 8);
  return date;
}

export const fetchWorkoutsAtomQuery = atomWithQuery<Workout[]>((get) => ({
  queryKey: ["fetchWorkouts"],
  queryFn: async () => {
    const startDate = get(fetchWorkoutsStartDateAtom);
    const endDate = getInitEndDate();
    return await fetchWorkouts(startDate, endDate);
  },
}));

export const fetchWorkoutTypesAtom = atom<WorkoutType[]>((get) => {
  const { data: workouts } = get(fetchWorkoutsAtomQuery);
  const workoutTypes = workouts?.map((workout) => workout.workoutType) || [];
  const uniqueWorkoutTypes = Array.from(
    new Map(workoutTypes.map((workout) => [workout.name, workout])).values()
  );

  return uniqueWorkoutTypes;
});

export const workoutTypeFilterAtom = atom<WorkoutType[]>([]);
