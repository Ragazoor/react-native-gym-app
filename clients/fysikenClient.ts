import { BookedWorkout, parseBookedWorkout } from "@/models/bookedWorkout";
import { parseUser, User } from "@/models/user";
import { parseWorkout, Workout } from "@/models/workout";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL!;

export const login = (username: string, password: string): Promise<User> => {
  const body = {
    login: username,
    password: password,
  };

  const loginQuery = fetch(`${BASE_URL}/v8.0/memberapi/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then(async (response) => {
    const status = await response.status;
    const jsonResp = await response.json();
    if (status == 200) {
      const user = parseUser(jsonResp);
      return user;
    } else {
      throw new Error(
        `Login misslyckades med status ${status}: ${jsonResp.message}`
      );
    }
  });

  return loginQuery;
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

export const fetchMyWorkouts = (): Promise<BookedWorkout[]> => {
  const today = new Date();
  const isoArray = today.toISOString().split("T");
  const dateStr = isoArray[0];
  const timeStr = isoArray[1].split(":").slice(0, 2).join(":");

  const url = `${BASE_URL}/memberapi/bookings/get?fromDate=${dateStr}:${timeStr}`;

  const fetchMyWorkoutQuery = fetch(encodeURI(url), {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (response) => {
    const status = await response.status;
    const jsonResp = await response.json();
    if (status === 200) {
      return jsonResp["workouts"].map(parseBookedWorkout);
    } else {
      throw new Error(
        `Hämtning av pass misslyckades. Statuskod ${status}: ${jsonResp.message}`
      );
    }
  });

  return fetchMyWorkoutQuery;
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
