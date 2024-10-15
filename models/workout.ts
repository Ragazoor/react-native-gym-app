import { Staff } from "./user";

export interface Workout {
  id: number;
  extraTitle: string;
  startTime: string;
  endTime: string;
  numBooked: number;
  numSpace: number;
  numQueued: number;
  workoutType: WorkoutType;
  staffs: Staff[];
}

export interface WorkoutType {
  id: number;
  name: string;
}

export function parseWorkout(data: any): Workout {
  try {
    return {
      id: data.id,
      extraTitle: data.extra_title,
      startTime: data.startTime,
      endTime: data.endTime,
      numBooked: data.numBooked,
      numSpace: data.space,
      numQueued: data.numQueued,
      workoutType: data.workoutType,
      staffs: data.staffs,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new ReferenceError("Error parsing workout");
  }
}
