import { parseStaff, Staff } from "./user";
import { dateToWeekDay, WorkoutType } from "./workout";

export interface BookedWorkout {
  id: number;
  extraTitle: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
  numBooked: number;
  numSpace: number;
  numQueued: number;
  inQueue: boolean;
  workoutType: WorkoutType;
  staffs: Staff[];
  weekDay: string;
}

export function parseMyWorkout(data: any): BookedWorkout {
  try {
    return {
      id: data.id,
      extraTitle: data.extra_title,
      startTime: data.startTime,
      endTime: data.endTime,
      numBooked: data.numBooked,
      numSpace: data.space,
      numQueued: data.numQueue,
      inQueue: data.inQueue,
      workoutType: data.workoutType,
      isBooked: data.booked,
      staffs: data.staffs.map(parseStaff),
      weekDay: dateToWeekDay(new Date(data.startTime)),
    };
  } catch (error) {
    console.error("Error:", error);
    throw new ReferenceError("Error parsing workout");
  }
}
