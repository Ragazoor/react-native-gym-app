import { fetchMyWorkouts } from "@/clients/gymClient";
import { FriendWorkout, Friend } from "@/models/friend";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

const friendList: Friend[] = [{ id: 1, name: "Ragnar" }];

const friendListAtom = atom<Friend[]>(friendList);

export const friendsAtom = atomWithQuery<FriendWorkout[]>((get) => ({
  queryKey: ["friendsWorkouts"],
  queryFn: async () => {
    const friendList = get(friendListAtom);
    const myWorkouts = await fetchMyWorkouts();
    return friendList.map((friend) => ({
      ...friend,
      workouts: myWorkouts,
    }));
  },
}));
