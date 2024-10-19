import { parseStaff, Staff } from "./user";

export interface Workout {
  id: number;
  duration: string;
  startTime: Date;
  endTime: Date;
  numBooked: number;
  numSpace: number;
  numQueued: number;
  workoutType: WorkoutType;
  staffs: Staff[];
  weekDay: string;
  venue?: Venue;
}

export interface WorkoutType {
  id: number;
  name: string;
}

export interface Venue {
  id: number;
  name: string;
  room: string;
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
      workoutType: data.workoutType,
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

function parseVenue(data: any): Venue | undefined {
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
