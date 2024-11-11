import { parseStaff, Staff } from "./user";

export type BaseWorkout = {
  id: number;
  startTime: Date;
  endTime: Date;
  workoutType: WorkoutType;
  venue?: Venue;
};

export type Workout = BaseWorkout & {
  duration: string;
  numBooked: number;
  numSpace: number;
  numQueued: number;
  staffs: Staff[];
  weekDay: string;
};

export interface WorkoutType {
  id: number;
  name: string;
}

export interface Venue {
  id: number;
  name: VenueName;
  room: string;
}

export enum VenueName {
  GIBRALTARGATAN = "Gibraltargatan",
  KASTERNTORGET = "Kaserntorget",
}

export function parseWorkout(data: any): Workout {
  try {
    return {
      id: data.id,
      duration: data.extra_title,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      numBooked: data.numBooked,
      numSpace: data.space,
      numQueued: data.numQueue,
      workoutType: {
        id: data.workoutType.id,
        name: data.workoutType.name,
      },
      staffs: data.staffs.map(parseStaff),
      weekDay: dateToWeekDay(new Date(data.startTime)),
      venue: parseVenue(data),
    };
  } catch (error) {
    console.error("Error:", error);
    console.log("Error parsing workout", data.resources);
    console.log(data.workoutType);
    throw new ReferenceError("Error parsing workout");
  }
}

export function parseVenue(data: any): Venue | undefined {
  if (data.resources.length === 0) {
    return undefined;
  } else {
    const [room, name] = data.resources[0].lastname.split(" ");
    return { id: data.resources[0].id, name: name, room: room };
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
