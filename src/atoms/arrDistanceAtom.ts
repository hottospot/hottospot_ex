import { atom } from "jotai";

interface arrDistanceProps {
  explanation: string;
  latitude: number;
  likes: number;
  longitude: number;
  tags: string;
  tiktokTitle: string;
  url: string;
  userName: string;
  title: string;
  photoName: string;
  place: string;
  scale:number;
}

export const arrDistanceAtom = atom<arrDistanceProps[]>([
  {
    explanation: "",
    latitude: 0,
    likes: 0,
    longitude: 0,
    tags: "",
    tiktokTitle: "",
    url: "",
    userName: "",
    photoName: "",
    title: "",
    place: "",
    scale:0
  },
]);
