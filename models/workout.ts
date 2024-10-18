import { parseStaff, Staff } from "./user";

export interface Workout {
  id: number;
  extraTitle: string;
  startTime: Date;
  endTime: Date;
  numBooked: number;
  numSpace: number;
  numQueued: number;
  workoutType: WorkoutType;
  staffs: Staff[];
  weekDay: string;
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
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      numBooked: data.numBooked,
      numSpace: data.space,
      numQueued: data.numQueue,
      workoutType: data.workoutType,
      staffs: data.staffs.map(parseStaff),
      weekDay: dateToWeekDay(new Date(data.startTime)),
    };
  } catch (error) {
    console.error("Error:", error);
    throw new ReferenceError("Error parsing workout");
  }
}

export function dateToWeekDay(date: Date): string {
  const days = [
    "Söndag",
    "Måndag",
    "Tisdag",
    "Onsdag",
    "Torsdag",
    "Fredag",
    "Lördag",
  ];
  return days[date.getDay()];
}
