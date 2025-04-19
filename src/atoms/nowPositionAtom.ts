import { atom } from 'jotai'

type nowPositionAtom = [number, number]
// interface nowPositionAtom {
//   latitude: number|null;
//   longitude: number|null;
// }
export const nowPositionAtom = atom<nowPositionAtom | null>(
  null
)
