import { parseStaff, Staff } from "./user";
import { WorkoutType } from "./workout";

export interface MyWorkout {
  id: number;
  extraTitle: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  numBooked: number;
  numSpace: number;
  isQueued: boolean;
  workoutType: WorkoutType;
  staffs: Staff[];
}

export interface WorkoutType {
  id: number;
  name: string;
}

type BaseUser = {
  id: number;
  firstName: string;
  lastName: String;
};

export type Staff = BaseUser;

export function parseMyWorkout(data: any): MyWorkout {
  try {
    return {
      id: data.id,
      extraTitle: data.extra_title,
      startTime: data.startTime,
      endTime: data.endTime,
      numBooked: data.numBooked,
      numSpace: data.space,
      isQueued: data.inQueue,
      workoutType: data.workoutType,
      isBooked: data.booked,
      staffs: data.staffs.map(parseStaff),
    };
  } catch (error) {
    console.error("Error:", error);
    throw new ReferenceError("Error parsing workout");
  }
}
