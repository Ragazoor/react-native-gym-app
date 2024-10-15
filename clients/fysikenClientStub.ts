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

export const fetchWorkouts = (
  startDate: Date,
  endDate: Date
): Promise<Workout[]> => {
  const workouts = [
    {
      id: 1,
      extraTitle: "Yoga",
      startTime: "2022-01-01T09:00:00",
      endTime: "2022-01-01T10:00:00",
      numBooked: 10,
      numSpace: 20,
      numQueued: 0,
      workoutType: { id: 1, name: "Yoga" },
      staffs: [],
    },
    {
      id: 2,
      extraTitle: "Crossfit",
      startTime: "2022-01-01T10:00:00",
      endTime: "2022-01-01T11:00:00",
      numBooked: 10,
      numSpace: 20,
      numQueued: 0,
      workoutType: { id: 2, name: "Crossfit" },
      staffs: [],
    },
  ];
  return Promise.resolve(workouts);
};
