import { WorkoutType } from "@/models/workout";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = createJSONStorage<WorkoutType[]>(() => AsyncStorage);

export const workoutTypeFilterAtom = atomWithStorage<WorkoutType[]>(
  "workoutTypeFiltersAtom",
  [],
  storage,
  {
    getOnInit: true,
  }
);
