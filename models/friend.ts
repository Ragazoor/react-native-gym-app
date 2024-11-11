import { BookedWorkout } from "./bookedWorkout";

export type Friend = {
  userId: string;
  userName: string;
};

export type FriendWorkout = Friend & {
  workouts: BookedWorkout[];
};
