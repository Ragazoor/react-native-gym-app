import { BookedWorkout, parseBookedWorkout } from "@/models/bookedWorkout";
import { parseUser, User } from "@/models/user";
import { parseWorkout, Workout } from "@/models/workout";

const BASE_URL = process.env.EXPO_PUBLIC_GYM_BASE_URL!;

export const login = async (
  username: string,
  password: string
): Promise<User> => {
  const body = {
    login: username,
    password: password,
  };

  console.log("BASE_URL", BASE_URL);
  const loginResp = await fetch(`${BASE_URL}/v8.0/memberapi/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const jsonResp = await loginResp.json();
  if (loginResp.status == 200) {
    const user = parseUser(jsonResp);
    return user;
  } else {
    throw new Error(
      `Login misslyckades med status ${loginResp.status}: ${jsonResp.message}`
    );
  }
};

export const fetchWorkouts = (
  startDate: Date,
  endDate: Date
): Promise<Workout[]> => {
  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  const url = `${BASE_URL}/public/workout/get/all?fromDate=${startStr}&toDate=${endStr}`;

  const fetchWorkoutQuery = fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const jsonResp = await response.json();
    return jsonResp["workouts"].map(parseWorkout);
  });

  return fetchWorkoutQuery;
};

export const fetchMyWorkouts = async (): Promise<BookedWorkout[]> => {
  const today = new Date();
  const isoArray = today.toISOString().split("T");
  const dateStr = isoArray[0];
  const timeStr = isoArray[1].split(":").slice(0, 2).join(":");

  const url = `${BASE_URL}/memberapi/bookings/get?fromDate=${dateStr}:${timeStr}`;

  const response = await fetch(encodeURI(url), {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResp = await response.json();
  if (response.status === 200) {
    return jsonResp["workouts"].map(parseBookedWorkout);
  } else {
    throw new Error(
      `Hämtning av pass misslyckades. Statuskod ${response.status}: ${jsonResp.message}`
    );
  }
};

type SessionRecord = {
  [userId: number]: {
    session: string;
  };
};
const sessionRecord: SessionRecord = {
  1: {
    session: "session1",
  },
};

export const getFriendsWorkouts = async (
  userId: number
): Promise<BookedWorkout[]> => {
  const today = new Date();
  const isoArray = today.toISOString().split("T");
  const dateStr = isoArray[0];
  const timeStr = isoArray[1].split(":").slice(0, 2).join(":");

  const url = `${BASE_URL}/memberapi/bookings/get?fromDate=${dateStr}:${timeStr}`;

  const response = await fetch(encodeURI(url), {
    method: "GET",
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
      Cookie: `session=${sessionRecord[userId].session}`,
    },
  });

  const jsonResp = await response.json();
  if (response.status === 200) {
    return jsonResp["workouts"].map(parseBookedWorkout);
  } else {
    throw new Error(
      `Hämtning av pass misslyckades. Statuskod ${response.status}: ${jsonResp.message}`
    );
  }
};

export const bookWorkout = (
  userId: number,
  workoutId: number
): Promise<void> => {
  const url = `${BASE_URL}/memberapi/workoutBooking/add?workout=${workoutId}&method=trainingcard&user_id=${userId}`;

  const bookWorkoutQuery = fetch(encodeURI(url), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const status = await response.status;
    if (status === 200) {
      return;
    } else {
      const jsonResp = await response.json();
      throw new Error(
        `Bokning av pass misslyckades. Statuskod ${status}: ${jsonResp.message}`
      );
    }
  });

  return bookWorkoutQuery;
};

export const removeWorkout = (
  userId: number,
  workoutId: number
): Promise<void> => {
  const url = `${BASE_URL}/memberapi/workoutBooking/remove?workout=${workoutId}&booked_user=${userId}`;

  const removeWorkoutQuery = fetch(encodeURI(url), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const status = await response.status;
    if (status === 200) {
      return;
    } else {
      const jsonResp = await response.json();
      throw new Error(
        `Bokning av pass misslyckades. Statuskod ${status}: ${jsonResp.message}`
      );
    }
  });

  return removeWorkoutQuery;
};

export const getCurrentUser = async (): Promise<User> => {
  const url = `${BASE_URL}/memberapi/get/current`;

  const response = await fetch(encodeURI(url), {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const status = response.status;
  const jsonResp = await response.json();
  if (status === 200) {
    return parseUser(jsonResp);
  } else {
    throw new Error(
      `Kunde inte hämta användare. Statuskod ${status}: ${jsonResp.message}`
    );
  }
};
