import { parseStaff, Staff } from "./user";
import { BaseWorkout, dateToWeekDay, parseVenue, WorkoutType } from "./workout";

export type BookedWorkout = BaseWorkout & {
  extraTitle: string;
  isBooked: boolean;
  numBooked: number;
  numSpace: number;
  numQueued: number;
  inQueue: boolean;
  staffs: Staff[];
  weekDay: string;
};

export function parseBookedWorkout(data: any): BookedWorkout {
  try {
    return {
      id: data.id,
      extraTitle: data.extra_title,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      numBooked: data.numBooked,
      numSpace: data.space,
      numQueued: data.numQueue,
      inQueue: data.inQueue,
      workoutType: {
        id: data.workoutType.id,
        name: data.workoutType.name,
      },
      isBooked: data.booked,
      staffs: data.staffs.map(parseStaff),
      weekDay: dateToWeekDay(new Date(data.startTime)),
      venue: parseVenue(data),
    };
  } catch (error) {
    console.error("Error:", error);
    throw new ReferenceError("Error parsing workout");
  }
}
