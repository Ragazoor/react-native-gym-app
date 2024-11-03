import { BookedWorkout } from "./bookedWorkout";

export type Friend = {
  id: number;
  name: string;
};

export type FriendWorkout = Friend & {
  workouts: BookedWorkout[];
};
