import { User } from "@/models/user";
import { parseWorkout, Workout } from "@/models/workout";

export const login = (username: string, password: string): Promise<User> => {
  const user: User = {
    id: parseInt(process.env.EXPO_PUBLIC_MOCKED_ID!, 10),
    firstName: `${username}`,
    lastName: `${password}`,
    email: "peter.jöback@gmail.com",
    gender: "male",
  };

  return Promise.resolve(user);
};

export const getCurrentUser = (): Promise<User> => {
  return Promise.reject(new Error("Not implemented"));
};
