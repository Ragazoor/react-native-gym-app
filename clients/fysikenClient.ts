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
    const jsonResp = await response.json();
    return parseUser(jsonResp);
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
    const jsonRespList = await response.json();
    return jsonRespList.map(parseWorkout);
  });

  return fetchWorkoutQuery;
};
