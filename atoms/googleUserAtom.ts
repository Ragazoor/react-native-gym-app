import { User as GoogleUser } from "@react-native-google-signin/google-signin";
import { atom } from "jotai";

export const googleUserAtom = atom<GoogleUser | undefined>(undefined);
