import { BaseWorkout, Workout } from "./workout";

export const buildGoogleEvent = (
  workout: BaseWorkout
): CreateGoogleEventDto => {
  return {
    summary: `${workout.workoutType.name}`,
    location: `${workout.venue ? workout.venue.name : ""}`,
    start: {
      dateTime: workout.startTime.toISOString(),
      timeZone: "Europe/Stockholm",
    },
    end: {
      dateTime: workout.endTime.toISOString(),
      timeZone: "Europe/Stockholm",
    },
    recurrence: [],
    attendees: [],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };
};

export type CreateGoogleEventDto = {
  id?: string;
  status?: string;
  summary: string;
  description?: string;
  location: string;
  colorId?: string;
  start: {
    date?: string;
    dateTime: string;
    timeZone?: string;
  };
  end: {
    date?: string;
    dateTime: string;
    timeZone?: string;
  };
  recurrence: string[];
  attendees: GoogleEventAttendee[];
  reminders: {
    useDefault: boolean;
    overrides: GoogleReminderOverride[];
  };
  eventType?: string;
};

type GoogleEventAttendee = {
  email: string;
  displayName: string;
  resource: boolean;
  optional: boolean;
  responseStatus: string;
  comment: string;
  additionalGuests: number;
};

type GoogleReminderOverride = {
  method: string;
  minutes: number;
};
