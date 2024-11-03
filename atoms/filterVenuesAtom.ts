import { VenueName } from "@/models/workout";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

const initState = {
  [VenueName.GIBRALTARGATAN]: false,
  [VenueName.KASTERNTORGET]: false,
};

const filterVenuesAtom = atom(initState);

export const selectedVenuesListAtom = atom((get) => {
  const state = get(filterVenuesAtom);
  return Object.entries(state)
    .map(([name, active]) => ({ name, active }))
    .filter(({ active }) => active);
});

export const isVenueSelectedAtom = atomFamily((venueName: VenueName) =>
  atom(
    (get) => {
      const allVenues = get(filterVenuesAtom);
      return allVenues[venueName];
    },
    (get, set, isSelected: boolean) => {
      const prev = get(filterVenuesAtom);
      set(filterVenuesAtom, { ...prev, [venueName]: isSelected });
    }
  )
);
