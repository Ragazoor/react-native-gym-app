import { fetchWorkoutsAtomQuery } from "@/atoms/fetchWorkoutsAtom";
import { selectedVenuesListAtom } from "@/atoms/filterVenuesAtom";
import { workoutTypeFilterAtom } from "@/atoms/workoutTypeFilterAtom";
import { WorkoutType, Workout } from "@/models/workout";
import { useAtom, useAtomValue } from "jotai";
import { useState, useEffect, useMemo } from "react";

export function useGetFilteredWorkouts(selectedDateTime: Date) {
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  const [{ data: fetchedWorkouts }] = useAtom(fetchWorkoutsAtomQuery);
  const selectedVenues = useAtomValue(selectedVenuesListAtom);
  const workoutTypeFilter = useAtomValue(workoutTypeFilterAtom);

  const nowDateTime = new Date();

  useEffect(() => {
    if (fetchedWorkouts) {
      setAllWorkouts(fetchedWorkouts);
    }
  }, [fetchedWorkouts]);

  const filteredWorkouts = useMemo(() => {
    return allWorkouts.filter((workout) => {
      const workoutDate = workout.startTime.toLocaleString().split(",")[0];
      const selectedDate = selectedDateTime.toLocaleString().split(",")[0];

      const isOkVenue =
        selectedVenues.length > 0
          ? workout.venue &&
            selectedVenues
              .filter(({ active }) => active)
              .map(({ name }) => name)
              .includes(workout.venue.name)
          : true;

      const isOkWorkoutType =
        workoutTypeFilter.length > 0
          ? workoutTypeFilter
              .map((wt) => wt.name)
              .includes(workout.workoutType.name)
          : true;

      return (
        workoutDate === selectedDate &&
        workout.endTime > nowDateTime &&
        isOkVenue &&
        isOkWorkoutType
      );
    });
  }, [selectedDateTime, allWorkouts, selectedVenues, workoutTypeFilter]);

  return filteredWorkouts;
}
