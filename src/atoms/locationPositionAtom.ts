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

interface MapBoundsAtomProps {
  northEastLat: number | null;
  southWestLat: number | null;
  northEastLng: number | null;
  southWestLng: number | null;
}
export const MapBoundsAtom = atom<MapBoundsAtomProps>({
  northEastLat: null,
  southWestLat: null,
  northEastLng: null,
  southWestLng: null,
});
