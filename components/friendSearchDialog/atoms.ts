import { Friend } from "@/models/friend";
import { atom } from "jotai";

export const allUsersAtom = atom<Friend[]>([]);
export const searchQueryAtom = atom<string>("");

export const filteredUsersAtom = atom((get) => {
  const allUsers = get(allUsersAtom);
  const searchQuery = get(searchQueryAtom);

  return allUsers.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );
});
