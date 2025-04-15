import { atom } from "jotai";

interface locationPositionAtomProps {
  latitude: number | null;
  longitude: number | null;
  name: string | null;
}
export const locationPositionAtom = atom<locationPositionAtomProps>({
  latitude: null,
  longitude: null,
  name: null,
});
