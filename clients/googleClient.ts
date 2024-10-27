import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User as GoogleUser,
} from "@react-native-google-signin/google-signin";
import { CreateGoogleEventDto } from "@/models/createGoogleEventDto";
import { GoogleEventDto, parseGoogleEvent } from "@/models/dtos/googlEventDto";
import { formatDate } from "@/utils/dateUtils";

export const googleSignIn = async (): Promise<GoogleUser> => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      return response.data;
    } else {
      throw new Error("Google sign in was cancelled");
    }
  } catch (error) {
    return handleGoogleError(error);
  }
};

export const getCurrentGoogleUser = async (): Promise<GoogleUser> => {
  try {
    const response = await GoogleSignin.signInSilently();
    switch (response.type) {
      case "success":
        return response.data;
      case "noSavedCredentialFound":
        throw new Error("Ingen sparad google session hittades");
      default:
        throw new Error("Unknown error");
    }
  } catch (error) {
    return handleGoogleError(error);
  }
};

const handleGoogleError = (error: unknown): GoogleUser => {
  if (isErrorWithCode(error)) {
    switch (error.code) {
      case statusCodes.IN_PROGRESS:
        throw new Error("Google login is already in progress");
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        throw new Error("Android play services not available or outdated");
      default:
        throw error;
    }
  } else {
    throw error;
  }
};

export const listGoogleCalendars = async () => {
  const authToken = await GoogleSignin.getTokens();

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/users/me/calendarList",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken.accessToken}`,
      },
    }
  );

  return await response.json();
};

export const createCalendarEvent = async (
  event: CreateGoogleEventDto
): Promise<void> => {
  const authToken = await GoogleSignin.getTokens();
  const calendarId = "primary";

  await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken.accessToken}`,
      },
      body: JSON.stringify(event),
    }
  );

  return;
};

export const removeCalendarEvent = async (eventId: string): Promise<void> => {
  const authToken = await GoogleSignin.getTokens();
  const calendarId = "primary";

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken.accessToken}`,
      },
    }
  );

  if (response.status !== 204) {
    const respJson = await response.json();
    throw new Error(respJson.error.errors[0].message);
  } else return;
};

export const getWorkoutClendarEvent = async (
  workoutStartTime: Date,
  workoutEndTime: Date,
  searchString: string
): Promise<GoogleEventDto> => {
  const authToken = await GoogleSignin.getTokens();
  const calendarId = "primary";

  //const params = `timeMin=${workoutStartTime.toISOString()}&timeMax=${workoutEndTime.toISOString()}&q=${searchString}`;
  const params = `q=${searchString}`;

  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?${params}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken.accessToken}`,
      },
    }
  );

  const respJson = await response.json();

  if (respJson.error) throw new Error(respJson.error.errors[0].message);
  else {
    const events = respJson.items.map(parseGoogleEvent);
    if (events.length === 1) {
      return events[0];
    } else if (events.length > 1) {
      throw new Error("Multiple events found");
    } else {
      throw new Error("No events found");
    }
  }
};
