import { atom } from "jotai";

interface locationPositionAtomProps {
  explanation?: string | null;
  likes?: number | null;
  tags?: string | null;
  tiktokTitle?: string | null;
  photoName?: string | null;
  title?: string | null;
  url?: string | null;
  userName?: string | null;
  place?: string | null;
  latitude?:number | null;
  longitude?:number | null;
}
export const locationPositionAtom = atom<locationPositionAtomProps>({
  explanation:null,
  likes:null,
  tags:null,
  tiktokTitle:null,
  photoName:null,
  userName:null,
  place:null,
  latitude:null,
  longitude:null
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
