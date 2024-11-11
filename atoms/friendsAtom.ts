import {
  getFriendsWorkouts,
  getMyFriends,
  getUsers,
} from "@/clients/firebaseClient";
import { FriendWorkout, Friend } from "@/models/friend";
import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";

export const friendListAtomQuery = atomWithQuery<Friend[]>(() => ({
  queryKey: ["friendListAtom"],
  queryFn: async () => {
    return await getMyFriends();
  },
}));

const friendListAtom = atom<Friend[]>((get) => {
  const { data: friends } = get(friendListAtomQuery);
  return friends || [];
});

const firebaseUsersQueryAtom = atomWithQuery<Friend[]>(() => ({
  queryKey: ["usersAtom"],
  queryFn: async () => {
    return await getUsers();
  },
}));

export const firebaseUserAtom = atom<Friend[]>((get) => {
  const { data: users } = get(firebaseUsersQueryAtom);
  return users || [];
});

export const friendsWorkoutsAtom = atomWithQuery<FriendWorkout[]>((get) => ({
  queryKey: ["friendsWorkoutsAtom", get(friendListAtom)],
  queryFn: async ({ queryKey: [, friendList] }) => {
    return await getFriendsWorkouts(friendList as Friend[]);
  },
}));
